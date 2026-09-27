/* =========================================
   CHAINTRACK FRONTEND
   ========================================= */


/* CONNECT WALLET */

function connectWallet() {

    const button = document.querySelector(".connect-btn");

    button.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        Wallet Connected
    `;

    button.style.borderColor = "#00e676";
    button.style.color = "#00e676";

    showNotification("Wallet connected successfully!");
}


/* =========================================
   PACKAGE TRACKING
   ========================================= */

function trackPackage() {

    const input =
        document.getElementById("trackingInput");

    const result =
        document.getElementById("trackingResult");

    const shipmentId =
        document.getElementById("shipmentId");

    let id = input.value.trim();

    if (id === "") {

        id = "CT-2026-001";

    }

    shipmentId.innerText = id.toUpperCase();

    result.style.display = "block";

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    showNotification(
        "Shipment " + id.toUpperCase() + " found."
    );
}


/* ENTER KEY FOR TRACKING */

document
    .getElementById("trackingInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            trackPackage();

        }

    });


/* =========================================
   DASHBOARDS
   ========================================= */

function openDashboard(role) {

    const modal =
        document.getElementById("dashboardModal");

    const content =
        document.getElementById("dashboardContent");


    if (role === "supplier") {

        content.innerHTML = `

            <div class="dashboard-title">

                <i class="fa-solid fa-industry"></i>

                <div>
                    <small>ROLE</small>
                    <h2>Supplier Dashboard</h2>
                </div>

            </div>

            <div class="dashboard-form">

                <label>Package Name</label>

                <input
                    id="packageName"
                    type="text"
                    placeholder="e.g. Electronic Components"
                >


                <label>Receiver Name</label>

                <input
                    type="text"
                    placeholder="Receiver name"
                >


                <label>Destination</label>

                <input
                    type="text"
                    placeholder="Mumbai, Maharashtra"
                >


                <label>Package Weight</label>

                <input
                    type="number"
                    placeholder="Weight in KG"
                >


                <button onclick="createShipment()">

                    <i class="fa-solid fa-plus"></i>

                    Create Blockchain Shipment

                </button>

            </div>

            <div id="supplierMessage"></div>
        `;
    }


    else if (role === "transporter") {

        content.innerHTML = `

            <div class="dashboard-title">

                <i class="fa-solid fa-truck"></i>

                <div>
                    <small>ROLE</small>
                    <h2>Transporter Dashboard</h2>
                </div>

            </div>

            <div class="dashboard-form">

                <label>Shipment ID</label>

                <input
                    type="text"
                    placeholder="CT-2026-001"
                >


                <label>Current Location</label>

                <input
                    type="text"
                    placeholder="Pune, Maharashtra"
                >


                <label>Shipment Status</label>

                <select>

                    <option>Picked Up</option>

                    <option>In Transit</option>

                    <option>At Distribution Center</option>

                    <option>Out for Delivery</option>

                </select>


                <button onclick="updateShipment()">

                    <i class="fa-solid fa-location-dot"></i>

                    Record Shipment Update

                </button>

            </div>

            <div id="transporterMessage"></div>
        `;
    }


    else {

        content.innerHTML = `

            <div class="dashboard-title">

                <i class="fa-solid fa-house-user"></i>

                <div>
                    <small>ROLE</small>
                    <h2>Receiver Dashboard</h2>
                </div>

            </div>

            <div class="dashboard-form">

                <label>Shipment ID</label>

                <input
                    id="receiverShipment"
                    type="text"
                    placeholder="CT-2026-001"
                >


                <button onclick="verifyShipment()">

                    <i class="fa-solid fa-shield-halved"></i>

                    Verify Blockchain Record

                </button>

            </div>

            <div id="receiverMessage"></div>
        `;

    }


    modal.classList.add("show");
}


/* CLOSE MODAL */

function closeDashboard() {

    document
        .getElementById("dashboardModal")
        .classList.remove("show");

}


/* =========================================
   SUPPLIER
   ========================================= */

function createShipment() {

    const packageName =
        document.getElementById("packageName").value;

    const message =
        document.getElementById("supplierMessage");


    if (packageName === "") {

        message.innerHTML = `

            <div class="success-message"
                 style="color:#ff8a80">

                Please enter a package name.

            </div>

        `;

        return;
    }


    const generatedID =
        "CT-" +
        new Date().getFullYear() +
        "-" +
        Math.floor(
            100 + Math.random() * 900
        );


    message.innerHTML = `

        <div class="success-message">

            <i class="fa-solid fa-circle-check"></i>

            Shipment created successfully!

            <br><br>

            <strong>
                Shipment ID: ${generatedID}
            </strong>

            <br><br>

            Blockchain record generated.

        </div>

    `;

}


/* =========================================
   TRANSPORTER
   ========================================= */

function updateShipment() {

    const message =
        document.getElementById(
            "transporterMessage"
        );


    message.innerHTML = `

        <div class="success-message">

            <i class="fa-solid fa-circle-check"></i>

            Shipment update recorded.

            <br><br>

            A new blockchain transaction
            has been generated.

        </div>

    `;

}


/* =========================================
   RECEIVER
   ========================================= */

function verifyShipment() {

    const message =
        document.getElementById(
            "receiverMessage"
        );


    message.innerHTML = `

        <div class="success-message">

            <i class="fa-solid fa-shield-halved"></i>

            Blockchain verification successful.

            <br><br>

            <strong>Shipment history is authentic.</strong>

            <br>

            No record mismatch detected.

        </div>

    `;

}


/* =========================================
   COPY HASH
   ========================================= */

function copyHash() {

    navigator.clipboard.writeText(
        "0x7a91e84b4f2d9c72f82c92"
    );

    showNotification(
        "Transaction hash copied!"
    );

}


/* =========================================
   NOTIFICATION
   ========================================= */

function showNotification(message) {

    const notification =
        document.createElement("div");


    notification.innerHTML = `

        <i class="fa-solid fa-circle-check"></i>

        ${message}

    `;


    notification.style.position = "fixed";

    notification.style.bottom = "25px";

    notification.style.right = "25px";

    notification.style.padding = "14px 18px";

    notification.style.background = "#0b1c15";

    notification.style.border =
        "1px solid rgba(0,230,118,.3)";

    notification.style.borderRadius = "10px";

    notification.style.color = "#00e676";

    notification.style.fontSize = "13px";

    notification.style.zIndex = "9999";

    notification.style.boxShadow =
        "0 15px 40px rgba(0,0,0,.4)";


    document.body.appendChild(notification);


    setTimeout(() => {

        notification.style.opacity = "0";

        notification.style.transform =
            "translateY(10px)";

        notification.style.transition =
            ".4s";

        setTimeout(() => {

            notification.remove();

        }, 400);

    }, 2500);

}


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ========================================= */

document
    .getElementById("dashboardModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeDashboard();

        }

    });


/* =========================================
   SCROLL REVEAL ANIMATION
   ========================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: .15
        }
    );


document
    .querySelectorAll(
        ".role-card, .blockchain-card, .chain-block, .tracking-result"
    )
    .forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";

        observer.observe(element);

    });