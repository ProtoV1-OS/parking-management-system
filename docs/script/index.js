let thisAdmin,
  thisDriver,
  thisLot,
  thisSpot,
  thisPayment,
  thisRequest,
  thisMessage;

$(window).on("hashchange", function (event) {
  const { hash, pathname } = new URL(location.href);
  if (hash && (thisAdmin || thisDriver)) {
    renderSection(hash.replace(/#/, ""));
  } else {
    location.href = pathname;
  }
});

/////////////////////////////////////////////////////
//                injection                       //
////////////////////////////////////////////////////
// -- html injections --
$("#register-form-request-lot-uid").click(function () {
  if ($("#register-form-request-lot-uid").children().length === 1) {
    PMS.getLots().then((list) => {
      $.each(list, function (_i, lot) {
        $("#register-form-request-lot-uid").append(
          $("<option>", {
            value: lot.uid,
            text: lot.name,
          })
        );
      });
    });
  }
});
$("#register-form-request-payment-uid").click(function () {
  if ($("#register-form-request-payment-uid").children().length === 1) {
    PMS.getThisPayments().then((list) => {
      $.each(list, function (_i, payment) {
        $("#register-form-request-payment-uid").append(
          $("<option>", {
            value: payment.uid,
            text: payment.name,
          })
        );
      });
    });
  }
});
$("#send-form-message-admin-to-user-uid").click(function () {
  if ($("#send-form-message-admin-to-user-uid").children().length === 1) {
    PMS.getDrivers().then((list) => {
      $.each(list, function (_i, driver) {
        $("#send-form-message-admin-to-user-uid").append(
          $("<option>", {
            value: driver.uid,
            text: driver.name,
          })
        );
      });
    });
  }
});
$("body").on("click", "#navigate-btn-lots-section", function () {
  $("#lot-selection-section .content-injection").empty();
  PMS.getLots().then((list) => {
    location.hash = "lot-selection-section";
    $.each(list, function (_i, lot) {
      $("#lot-selection-section .content-injection").append(
        $("<button>", {
          id: lot.uid,
          name: lot.name,
          text: lot.name,
          class: "navigate-btn-lot-id",
        })
      );
    });
  });
});
$("body").on("click", "#navigate-btn-requests-section", function () {
  PMS.getRequests().then((list) => {
    const pendingRequests = list.filter(
      (request) => request.state === "pending"
    );
    location.hash = "admin-requests-section";
    renderRequestsTo(
      pendingRequests,
      "#admin-requests-section .content-injection"
    );
  });
});
$("body").on("click", ".navigate-btn-lot-id", function () {
  const $target = $(this);
  PMS.getLots().then((list) => {
    location.hash = "lot-selected-section";
    $.each(list, function (_i, lot) {
      if ($target.attr("id") === lot.uid) {
        thisLot = lot;
        renderAdminLot(thisLot);
      }
    });
  });
});
$("body").on("click", ".grid-elem-spot-id", function () {
  const $target = $(this);
  thisSpot = thisLot.spots.filter((s) => s.uid === $target.attr("id"))[0];
  updateAdminSpotsState(thisSpot.uid);
});
$("body").on("click", "#action-btn-spot-reserved", function () {
  thisLot.reserveSpot({ uid: thisSpot.uid }).then((lot) => {
    thisLot = lot;
    updateAdminSpotsState(thisSpot.uid);
  });
});
$("body").on("click", "#action-btn-spot-opened", function () {
  thisLot.openSpot({ uid: thisSpot.uid }).then((lot) => {
    thisLot = lot;
    updateAdminSpotsState(thisSpot.uid);
  });
});
$("body").on("click", "#action-btn-request-automate", function () {
  $("#action-form-admin-requests-selection")
    .attr("data-action", "automate")
    .submit();
});
$("body").on("click", "#action-btn-request-accept", function () {
  $("#action-form-admin-requests-selection")
    .attr("data-action", "accept")
    .submit();
});
$("body").on("click", "#action-btn-request-reject", function () {
  $("#action-form-admin-requests-selection")
    .attr("data-action", "reject")
    .submit();
});

/////////////////////////////////////////////////////
//                    forms                       //
////////////////////////////////////////////////////

// -- admin login --
$("#login-form-admin").submit(function (event) {
  event.preventDefault();
  const name = $("#login-form-admin-name").val();
  const password = $("#login-form-admin-password").val();
  new PMS.Admin({ name, password })
    .login()
    .then((admin) => {
      thisAdmin = admin;
      location.hash = "admin-home-section";
    })
    .catch(() => alert("-- wrong credentials --"));
});

// -- driver login --
$("#login-form-driver").submit(async function (event) {
  event.preventDefault();
  const email = $("#login-form-driver-email").val();
  const password = $("#login-form-driver-password").val();
  thisDriver = await new PMS.Driver({ email, password }).login();
  console.log(thisDriver);
});

// -- admin registration --
$("#register-form-admin").submit(async function (event) {
  event.preventDefault();
  const name = $("#register-form-admin-name").val();
  const password = $("#register-form-admin-password").val();
  thisAdmin = await new PMS.Admin({ name, password }).register();
  console.log(thisAdmin);
});

// -- driver registration --
$("#register-form-driver").submit(async function (event) {
  event.preventDefault();
  const name = $("#register-form-driver-name").val();
  const email = $("#register-form-driver-email").val();
  const password = $("#register-form-driver-password").val();
  thisDriver = await new PMS.Driver({ name, email, password }).register();
  console.log(thisDriver);
});

// -- lot registration --
$("#register-form-lot").submit(async function (event) {
  event.preventDefault();
  const name = $("#register-form-lot-name").val();
  const coordinate = $("#register-form-lot-coordinate").val();
  const capacity = $("#register-form-lot-capacity").val();
  thisLot = await new PMS.Lot({ name, coordinate, capacity }).register();
  console.log(thisLot);
});

// -- payment registration --
$("#register-form-payment").submit(async function (event) {
  event.preventDefault();
  const name = $("#register-form-payment-name").val();
  const ccn = $("#register-form-payment-card-no").val();
  const ccv = $("#register-form-payment-ccv").val();
  const exp = $("#register-form-payment-expiry-date").val();
  thisPayment = await new PMS.Payment({
    driverUID: thisDriver.uid,
    name,
    ccn,
    ccv,
    exp,
  }).register();
  console.log(thisPayment);
});

// -- request registration --
$("#register-form-request").submit(async function (event) {
  event.preventDefault();
  const lotUID = $("#register-form-request-lot-uid").val();
  const paymentUID = $("#register-form-request-payment-uid").val();
  const start = $("#register-form-request-start").val();
  const end = $("#register-form-request-end").val();
  thisRequest = await new PMS.Request({
    lotUID,
    paymentUID,
    start,
    end,
  }).send();
  console.log(thisRequest);
});

// -- admin message sending --
$("#send-form-message-admin").submit(async function (event) {
  event.preventDefault();
  const toUserUIDS = $("#send-form-message-admin-to-user-uid").val();
  const title = $("#send-form-message-admin-title").val();
  const content = $("#send-form-message-admin-content").val();
  thisMessage = await new PMS.Message({
    fromUserUID: thisAdmin.uid,
    toUserUIDS,
    title,
    content,
  }).send();
  console.log(thisMessage);
});

// -- driver message sending --
$("#send-form-message-driver").submit(async function (event) {
  event.preventDefault();
  const title = $("#send-form-message-driver-title").val();
  const content = $("#send-form-message-driver-content").val();
  thisMessage = await new PMS.Message({
    fromUserUID: thisDriver.uid,
    toUserUIDS: [thisAdmin.uid],
    title,
    content,
  }).send();
  console.log(thisMessage);
});

// -- request automate action --
$("#action-form-admin-requests-selection").submit(async function (event) {
  event.preventDefault();
  const $target = $(this);
  let filteredRequests = [];
  let promiseRequestActions = [];
  PMS.getRequests().then((list) => {
    $("#action-form-admin-requests-selection input[type='checkbox']").each(
      function (_i, item) {
        for (const req of list) {
          if (req.uid === $(item).val() && $(item).is(":checked")) {
            filteredRequests.push(req);
          }
        }
      }
    );
    for (const req of filteredRequests) {
      req[$target.attr("data-action")];
      promiseRequestActions.push(req[$target.attr("data-action")]());
    }
    Promise.all(promiseRequestActions).then(() => {
      const pendingRequests = list.filter((r) => r.state === "pending");
      renderRequestsTo(
        pendingRequests,
        "#admin-requests-section .content-injection"
      );
    });
  });
});

/////////////////////////////////////////////////////
//                utilities                       //
////////////////////////////////////////////////////

// -- make a section visible --
function renderSection(sectionID) {
  $(".page-section").each(function (_idx, elem) {
    if (elem.id === sectionID) {
      elem.classList.remove("hidden");
    } else {
      elem.classList.add("hidden");
    }
  });
  hydrateSection();
}

// -- update the visual presentation of request list to a section of the DOM --
function renderRequestsTo(requests, host) {
  $(host).empty();
  $.each(requests, function (_i, request) {
    thisRequest = request;
    request.toString().then((labelString) => {
      $(host).append(
        $("<div>").append(
          $("<input>", {
            id: request.uid,
            value: request.uid,
            name: "selections[]",
            type: "checkbox",
          }),
          [
            $("<label>", {
              for: request.uid,
              text: labelString,
            }),
          ]
        )
      );
    });
  });
  hydrateSection();
}

// -- update the visual presentation of a lot --
function renderAdminLot(lot) {
  $("#lot-selected-section > .content-injection").empty();
  lot.spots.forEach((spot, j) => {
    $("#lot-selected-section > .content-injection").append(
      $("<button>", {
        text: `S-${j + 1}`,
        id: spot.uid,
        "data-type": spot.type,
        "data-state": spot.state,
        class: "grid-elem-spot-id",
      })
    );
  });
  hydrateSection();
}

// -- update the visual presentation of all spots in current lot --
function updateAdminSpotsState(lotUID) {
  renderAdminLot(thisLot);
  $(".grid-elem-spot-id").each(function (_idx, elem) {
    if (lotUID === $(elem).attr("id")) {
      $(elem).attr("data-selected", "true");
      switch (thisSpot.state) {
        case "reserved":
          $("#action-btn-spot-reserved").attr("disabled", true);
          $("#action-btn-spot-opened").attr("disabled", false);
          break;
        case "opened":
          $("#action-btn-spot-reserved").attr("disabled", false);
          $("#action-btn-spot-opened").attr("disabled", true);
          break;
        default:
          $("#action-btn-spot-reserved").attr("disabled", true);
          $("#action-btn-spot-opened").attr("disabled", true);
          break;
      }
    } else {
      $(elem).attr("data-selected", "false");
    }
  });
  hydrateSection();
}

// --hydrate page-section --
function hydrateSection() {
  if (thisAdmin) {
    $("[data-inner-admin-name]").text(thisAdmin.name);
  }
  if (thisLot) {
    $("[data-inner-lot-uid]").text(thisLot.uid);
    $("[data-inner-lot-coordinate]").text(thisLot.coordinate);
    $("[data-inner-lot-name]").text(thisLot.name);
    $("[data-inner-lot-spaces]").text(thisLot.spots.length);
    $("[data-inner-spot-opened]").text(
      thisLot.spots.filter((s) => s.state === "opened").length
    );
    $("[data-inner-spot-occupied]").text(
      thisLot.spots.filter((s) => s.state === "occupied").length
    );
    $("[data-inner-spot-reserved]").text(
      thisLot.spots.filter((s) => s.state === "reserved").length
    );
  }

  if (thisSpot) {
    $("[data-inner-spot-uid]").text(thisSpot.uid);
    $("[data-inner-spot-state]").text(thisSpot.state);
  }
}
