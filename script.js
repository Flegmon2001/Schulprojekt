// TESTDATEN (später durch PDF ersetzen)
let stundenplan = [
    ["Mathe", "Deutsch", "Englisch"],
    ["Sport", "Mathe", "Bio"],
    ["Deutsch", "IK", "Chemie"]
];

let schueler = {
    "Max Mustermann": "10A",
    "Lisa Müller": "10A"
};

// Fächer automatisch sammeln
let alleFaecher = new Set();
stundenplan.forEach(tag => tag.forEach(fach => alleFaecher.add(fach)));

// Dropdown füllen
let select = document.getElementById("schuelerSelect");
for (let name in schueler) {
    let option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
}

// Checkboxen erstellen
let faecherDiv = document.getElementById("faecherListe");
alleFaecher.forEach(fach => {
    let label = document.createElement("label");
    let checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.value = fach;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(fach));

    faecherDiv.appendChild(label);
    faecherDiv.appendChild(document.createElement("br"));
});

// Stundenplan generieren
function generatePlan() {
    let checkboxes = document.querySelectorAll("#faecherListe input");
    let userFaecher = [];

    checkboxes.forEach(cb => {
        if (cb.checked) userFaecher.push(cb.value);
    });

    let neuerPlan = stundenplan.map(tag =>
        tag.map(fach =>
            userFaecher.includes(fach) ? fach : "IK"
        )
    );

    displayPlan(neuerPlan);
}

// Anzeige
function displayPlan(plan) {
    let table = document.getElementById("outputTable");
    table.innerHTML = "";

    plan.forEach(tag => {
        let tr = document.createElement("tr");

        tag.forEach(fach => {
            let td = document.createElement("td");
            td.textContent = fach;
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });
}
