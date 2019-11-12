"use strict"

// ========== GLOBAL VARIABLES ========== //
// Your web app's Firebase configuration
const _db = firebase.firestore();
const _dataRef = _db.collection("sustainabilityData");
let _sustainabilityData;

// =========== Page functionality =========== //
let activePage = "dashboard";

// hide all pages
function hideAllPages() {
    let pages = document.querySelectorAll(".page");

    for (let page of pages) {
        page.style.display = "none";
    }
};

// show page
function showPage(pageId) {
    activePage = pageId;

    hideAllPages();

    document.querySelector(`#${pageId}`).style.display = "block";
    location.href = `#${pageId}`;

    setActiveTab(pageId);
};

// sets active tabbar/ menu item
function setActiveTab(pageId) {
    let pages = document.querySelectorAll(".set-active a");

    for (let page of pages) {
        if (`#${pageId}` === page.getAttribute("href")) {
            page.parentElement.classList.add("active");
        } else {
            page.parentElement.classList.remove("active");
        }

    }
};

// set default page
function setDefaultPage() {
    let page = "dashboard";

    if (location.hash) {
        page = location.hash.slice(1);
    }

    showPage(page);
};

setDefaultPage();

// ---------- Mobile menu --------- //
function initMobileMenu() {
    const menuButton = document.getElementById('menu-button');

    menuButton.addEventListener(
        'click',
        function () {
            toggleMenu();
        },
        false
    );
};

initMobileMenu();

function toggleMenu(open) {
    const menuButton = document.getElementById('menu-button');
    const navbarList = document.getElementById('navbar-list-mobile');
    const navbarMenu = document.querySelector('.navbar-mobile');

    navbarList.classList.toggle('is-open', open);
    menuButton.classList.toggle('is-open', open);
    navbarMenu.classList.toggle('is-open', open);
}

function handleMenuItemClick(pageId) {
    toggleMenu(false);
    showPage(pageId);
}

// listen for changes on _dataRef
_dataRef.orderBy("year").onSnapshot(function (snapshotData) {
    _sustainabilityData = []; // reset _sustainabilityData
    snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
        let data = doc.data(); // save the data in a variable
        data.id = doc.id; // add the id to the data variable
        _sustainabilityData.push(data); // push the data object to the global array _sustainabilityData
    });

    appendCarbonFootprint(_sustainabilityData); //call appendCarbonFootprint with _sustainabilityData as function argument
    appendDiesel(_sustainabilityData);
    appendElectricity(_sustainabilityData);
    findCurrentYear(_sustainabilityData);
    footprintIndicator(_sustainabilityData);
    dieselIndicator(_sustainabilityData);
    electricityIndicator(_sustainabilityData);
    importedFeedIndicator(_sustainabilityData);
    digestionIndicator(_sustainabilityData);
});

// ================== CHART JS ================== //

// ---------- Line chart Carbon Footprint ---------- //

function appendCarbonFootprint(sustainabilityData) {
    // prepare data
    let carbonFootprint = [];
    let years = [];
    sustainabilityData.forEach(data => {
        if (data.region === 'north') {
            carbonFootprint.push(data.carbonFootprint);
            years.push(data.year);
        }
    });

    // generate chart
    let charts = document.querySelectorAll('.carbonChart');
    for (let chart of charts) {
        let myDoughnutChart = new Chart(chart, {
            type: 'line',
            data: {
                datasets: [{
                    data: carbonFootprint,
                    label: 'Carbon Footprint',
                    fill: false,
                    borderColor: "#fff",
                    backgroundColor: "#fff",
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#fff",
                    borderWidth: 5,


                }],
                labels: years
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "#ffffff43"
                        },
                        ticks: {
                            fontColor: "#fff",
                        },

                    }],
                    yAxes: [{
                        gridLines: {
                            color: "#ffffff43"
                        },
                        ticks: {
                            fontColor: "#fff",
                        }
                    }]

                }
            }

        })
    }
};

// ---------- Line chart Diesel ---------- //
function appendDiesel(sustainabilityData) {
    // prepare data
    let diesel = [];
    let years = [];
    sustainabilityData.forEach(data => {
        if (data.region === 'north') {
            diesel.push(data.diesel);
            years.push(data.year);
        }
    });

    // generate chart
    let charts = document.querySelectorAll('.dieselChart');
    for (let chart of charts) {
        let myDoughnutChart = new Chart(chart, {
            type: 'line',
            data: {
                datasets: [{
                    data: diesel,
                    label: 'Diesel',
                    fill: false,
                    borderColor: "#fff",
                    backgroundColor: "#fff",
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#fff",
                    borderWidth: 5,


                }],
                labels: years
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "#ffffff43"
                        },
                        ticks: {
                            fontColor: "#fff",
                        },

                    }],
                    yAxes: [{
                        gridLines: {
                            color: "#ffffff43"
                        },
                        ticks: {
                            fontColor: "#fff",
                        }
                    }]

                }
            }

        })
    }
};

// ---------- Line chart Electricity ---------- //
function appendElectricity(sustainabilityData) {
    // prepare data
    let electricity = [];
    let years = [];
    sustainabilityData.forEach(data => {
        if (data.region === 'north') {
            electricity.push(data.electricity);
            years.push(data.year);
        }
    });

    // generate chart
    let charts = document.querySelectorAll('.electricityChart');
    for (let chart of charts) {
        let myDoughnutChart = new Chart(chart, {
            type: 'line',
            data: {
                datasets: [{
                    data: electricity,
                    label: 'Electricity',
                    fill: false,
                    borderColor: "#fff",
                    backgroundColor: "#fff",
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#fff",
                    borderWidth: 5,


                }],
                labels: years
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "#ffffff43"
                        },
                        ticks: {
                            fontColor: "#fff",
                        },

                    }],
                    yAxes: [{
                        gridLines: {
                            color: "#ffffff43"
                        },
                        ticks: {
                            fontColor: "#fff",
                        }
                    }]

                }
            }

        })
    }
};


// ================== append the data on the dashboard ================== //
function findCurrentYear(_sustainabilityData) {
    _sustainabilityData.forEach(data => {

        if (data.year === 2018) {
            let htmlTemplate = '';
            let htmlTemplateTwo = '';
            let htmlTemplateThree = '';
            let htmlTemplateFour = '';
            let htmlTemplateFive = '';

            htmlTemplate += `
             <h3>Carbon Footprint</h3>
             <span class="output-number">${data.carbonFootprint}</span>
             <div class="output-unit">kg of CO2 per kg of milk</div>`;

            htmlTemplateTwo += `
             <h3>Diesel</h3>
             <span class="output-number">${data.diesel}</span>
             <div class="output-unit">kg of CO2 per kg of milk</div>`;

            htmlTemplateThree += `
             <h3>Electricity</h3>
             <span class="output-number">${data.electricity}</span>
             <div class="output-unit">kg of CO2 per kg of milk</div>`;

            htmlTemplateFour += `
             <h3>Imported Feed</h3>
             <span class="output-number">${data.importedFeed}</span>
             <div class="output-unit">kg of CO2 per kg of milk</div>`;

            htmlTemplateFive += `
             <h3>Digestion</h3>
             <span class="output-number">${data.digestion}</span>
             <div class="output-unit">kg of CO2 per kg of milk</div>`;

            document.querySelector('.carbonFootprint').innerHTML = htmlTemplate;
            document.querySelector('.dieselData').innerHTML = htmlTemplateTwo;
            document.querySelector('.electricityData').innerHTML = htmlTemplateThree;
            document.querySelector('.importedFeedData').innerHTML = htmlTemplateFour;
            document.querySelector('.digestionData').innerHTML = htmlTemplateFive;
        }
    })
};



// ================== indicator functionality ================== //
// CARBON FOOTPRINT
function footprintIndicator(sustainabilityData) {
    let currentYearFootprint = {};
    let lastYearFootprint = {};
    let indicator = document.querySelector('.footprint-arrow');

    sustainabilityData.forEach(data => {
        if (data.year === 2017) {
            lastYearFootprint = data.carbonFootprint;
        }

        if (data.year === 2018) {
            currentYearFootprint = data.carbonFootprint;
        }

        if (currentYearFootprint > lastYearFootprint) {
            indicator.style.fill = 'red';
            indicator.style.transform = "rotate(-90deg)";

        } else if (currentYearFootprint < lastYearFootprint) {
            indicator.style.fill = 'green';
            indicator.style.transform = "rotate(90deg)";
        }
    })
};

// DIESEL
function dieselIndicator(sustainabilityData) {
    let currentYearDiesel = {};
    let lastYearDiesel = {};
    let indicator = document.querySelector('.diesel-arrow');

    sustainabilityData.forEach(data => {
        if (data.year === 2017) {
            lastYearDiesel = data.diesel;
        }

        if (data.year === 2018) {
            currentYearDiesel = data.diesel;
        }

        if (currentYearDiesel > lastYearDiesel) {
            indicator.style.fill = 'red';
            indicator.style.transform = "rotate(-90deg)";

        } else if (currentYearDiesel < lastYearDiesel) {
            indicator.style.fill = 'green';
            indicator.style.transform = "rotate(90deg)";
        }
    })
};

// ELECTRICITY
function electricityIndicator(sustainabilityData) {
    let currentYearElectricity = {};
    let lastYearElectricity = {};
    let indicator = document.querySelector('.electricity-arrow');

    sustainabilityData.forEach(data => {
        if (data.year === 2017) {
            lastYearElectricity = data.electricity;
        }

        if (data.year === 2018) {
            currentYearElectricity = data.electricity;
        }

        if (currentYearElectricity > lastYearElectricity) {
            indicator.style.fill = 'red';
            indicator.style.transform = "rotate(-90deg)";

        } else if (currentYearElectricity < lastYearElectricity) {
            indicator.style.fill = 'green';
            indicator.style.transform = "rotate(90deg)";
        }
    })
};

// IMPORTED FEED
function importedFeedIndicator(sustainabilityData) {
    let currentYearImportedFeed = {};
    let lastYearImportedFeed = {};
    let indicator = document.querySelector('.imported-feed-arrow');

    sustainabilityData.forEach(data => {
        if (data.year === 2017) {
            lastYearImportedFeed = data.importedFeed;
        }

        if (data.year === 2018) {
            currentYearImportedFeed = data.importedFeed;
        }

        if (currentYearImportedFeed > lastYearImportedFeed) {
            indicator.style.fill = 'red';
            indicator.style.transform = "rotate(-90deg)";

        } else if (currentYearImportedFeed < lastYearImportedFeed) {
            indicator.style.fill = 'green';
            indicator.style.transform = "rotate(90deg)";
        }
    })
};

// DIGESTION
function digestionIndicator(sustainabilityData) {
    let currentYearDigestion = {};
    let lastYearDigestion = {};
    let indicator = document.querySelector('.digestion-arrow');

    sustainabilityData.forEach(data => {
        if (data.year === 2017) {
            lastYearDigestion = data.digestion;
        }

        if (data.year === 2018) {
            currentYearDigestion = data.digestion;
        }

        if (currentYearDigestion > lastYearDigestion) {
            indicator.style.fill = 'red';
            indicator.style.transform = "rotate(-90deg)";

        } else if (currentYearDigestion < lastYearDigestion) {
            indicator.style.fill = 'green';
            indicator.style.transform = "rotate(90deg)";
        }
    })
};