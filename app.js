/* ============================================================
   IDE SpA · Integrated Data & Knowledge Intelligence Platform
   Illustrative Functional Prototype · UNDP-ZAF-00238

   IMPORTANT:
   All data in this prototype are synthetic and illustrative.
   They do not represent official UNDP or South African data.
============================================================ */


/* ============================================================
   1. SYNTHETIC DEMONSTRATION DATA
============================================================ */

const provinceData = [
  {
    id: "gauteng",
    name: "Gauteng",
    values: [43.8, 45.1, 46.7, 47.9, 49.0]
  },
  {
    id: "western-cape",
    name: "Western Cape",
    values: [42.9, 44.0, 45.3, 46.5, 47.6]
  },
  {
    id: "kwazulu-natal",
    name: "KwaZulu-Natal",
    values: [38.4, 39.2, 40.5, 41.7, 42.8]
  },
  {
    id: "mpumalanga",
    name: "Mpumalanga",
    values: [37.8, 38.7, 39.8, 40.9, 42.0]
  },
  {
    id: "free-state",
    name: "Free State",
    values: [37.2, 38.1, 39.1, 40.0, 41.0]
  },
  {
    id: "north-west",
    name: "North West",
    values: [36.4, 37.2, 38.2, 39.1, 40.1]
  },
  {
    id: "limpopo",
    name: "Limpopo",
    values: [35.7, 36.5, 37.3, 38.2, 39.2]
  },
  {
    id: "northern-cape",
    name: "Northern Cape",
    values: [34.8, 35.5, 36.3, 37.1, 38.0]
  },
  {
    id: "eastern-cape",
    name: "Eastern Cape",
    values: [31.5, 32.3, 33.2, 34.0, 34.8]
  }
];

const years = [2022, 2023, 2024, 2025, 2026];

const themes = {
  employment: {
    name: "Youth Employment",
    unit: "%",
    national: [39.4, 40.2, 41.1, 42.0, 42.8],
    insight:
      "The national indicator improves across the selected period, while territorial differences remain substantial. Gauteng and Western Cape show the strongest positive trajectories."
  },

  education: {
    name: "Education",
    unit: "%",
    national: [68.2, 69.1, 70.4, 71.6, 72.8],
    insight:
      "Education outcomes improve steadily in the demonstration series, although the pace of change differs across territories."
  },

  digital: {
    name: "Digital Inclusion",
    unit: "%",
    national: [57.1, 59.6, 62.8, 65.4, 68.7],
    insight:
      "Digital inclusion shows the fastest improvement in the synthetic dataset, while access gaps remain visible across provinces."
  },

  wellbeing: {
    name: "Social Wellbeing",
    unit: "%",
    national: [61.5, 62.1, 63.0, 63.8, 64.7],
    insight:
      "The wellbeing indicator improves gradually, with persistent territorial variation suggesting the need for differentiated interpretation."
  }
};


/* ============================================================
   2. APPLICATION STATE
============================================================ */

const state = {
  province: "all",
  theme: "employment",
  from: 2022,
  to: 2026
};


/* ============================================================
   3. ELEMENT REFERENCES
============================================================ */

const provinceFilter = document.getElementById("province-filter");
const themeFilter = document.getElementById("theme-filter");
const yearFrom = document.getElementById("year-from");
const yearTo = document.getElementById("year-to");

const pageTitle = document.getElementById("page-title");
const overviewHeading = document.getElementById("overview-heading");

const askContextText = document.getElementById("ask-context-text");
const mainInsight = document.getElementById("main-insight");

const dataTableBody = document.getElementById("data-table-body");
const provinceBars = document.getElementById("province-bars");

const knowledgeSearchInput =
  document.getElementById("knowledge-search-input");


/* ============================================================
   4. VIEW NAVIGATION
============================================================ */

const viewNames = {
  overview: "Executive Overview",
  explorer: "Data Explorer",
  ask: "Ask the Data",
  knowledge: "Knowledge Portal",
  methodology: "Methodology"
};


function openView(viewName) {

  document.querySelectorAll(".view").forEach(view => {
    view.classList.remove("active-view");
  });

  const selectedView =
    document.getElementById(`${viewName}-view`);

  if (selectedView) {
    selectedView.classList.add("active-view");
  }


  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  const nav =
    document.querySelector(
      `.nav-item[data-view="${viewName}"]`
    );

  if (nav) {
    nav.classList.add("active");
  }


  pageTitle.textContent = viewNames[viewName];

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  if (viewName === "explorer") {
    setTimeout(() => {
      comparisonChart.resize();
    }, 100);
  }

  if (viewName === "overview") {
    setTimeout(() => {
      trendChart.resize();
    }, 100);
  }
}


document.querySelectorAll(".nav-item").forEach(button => {

  button.addEventListener("click", () => {
    openView(button.dataset.view);
  });

});


document.querySelectorAll("[data-open-view]").forEach(button => {

  button.addEventListener("click", () => {
    openView(button.dataset.openView);
  });

});


document
  .getElementById("methodology-button")
  .addEventListener("click", () => {
    openView("methodology");
  });


/* ============================================================
   5. FILTER HELPERS
============================================================ */

function getSelectedProvince() {

  if (state.province === "all") {
    return null;
  }

  return provinceData.find(
    province => province.id === state.province
  );
}


function getSelectedTheme() {
  return themes[state.theme];
}


function getYearIndexes() {

  let fromIndex = years.indexOf(Number(state.from));
  let toIndex = years.indexOf(Number(state.to));

  if (fromIndex > toIndex) {
    [fromIndex, toIndex] = [toIndex, fromIndex];
  }

  return {
    fromIndex,
    toIndex
  };
}


function provinceName() {

  const province = getSelectedProvince();

  return province
    ? province.name
    : "South Africa";
}


/* ============================================================
   6. CHARTS
============================================================ */

const trendCanvas =
  document.getElementById("trend-chart");

const comparisonCanvas =
  document.getElementById("comparison-chart");


const trendChart = new Chart(trendCanvas, {

  type: "line",

  data: {
    labels: years,

    datasets: [{
      label: "National indicator",
      data: themes.employment.national,
      borderWidth: 3,
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
      backgroundColor: "rgba(20, 82, 86, 0.08)",
      borderColor: "#145256",
      pointBackgroundColor: "#145256"
    }]
  },

  options: {

    responsive: true,
    maintainAspectRatio: false,

    plugins: {

      legend: {
        display: false
      },

      tooltip: {
        backgroundColor: "#132f32",
        padding: 12,
        cornerRadius: 8
      }
    },

    scales: {

      x: {
        grid: {
          display: false
        },

        ticks: {
          color: "#667674"
        }
      },

      y: {

        grid: {
          color: "rgba(20,82,86,0.08)"
        },

        ticks: {
          color: "#667674"
        }
      }
    }
  }
});


const comparisonChart = new Chart(comparisonCanvas, {

  type: "bar",

  data: {

    labels: provinceData.map(p => p.name),

    datasets: [{
      label: "2026",
      data: provinceData.map(p => p.values[4]),
      borderWidth: 0,
      borderRadius: 5,
      backgroundColor: "#287f83"
    }]
  },

  options: {

    responsive: true,
    maintainAspectRatio: false,

    indexAxis: "y",

    plugins: {

      legend: {
        display: false
      },

      tooltip: {
        backgroundColor: "#132f32",
        padding: 12,
        cornerRadius: 8
      }
    },

    scales: {

      x: {

        beginAtZero: true,

        grid: {
          color: "rgba(20,82,86,0.08)"
        },

        ticks: {
          color: "#667674"
        }
      },

      y: {

        grid: {
          display: false
        },

        ticks: {
          color: "#465957"
        }
      }
    }
  }
});


/* ============================================================
   7. PROVINCIAL MINI-BARS
============================================================ */

function renderProvinceBars() {

  provinceBars.innerHTML = "";

  const sorted =
    [...provinceData]
      .sort((a, b) => b.values[4] - a.values[4]);

  sorted.forEach(province => {

    const value = province.values[4];

    const row = document.createElement("div");
    row.className = "province-row";

    row.innerHTML = `
      <div class="province-name">
        ${province.name}
      </div>

      <div class="province-track">
        <div
          class="province-fill"
          style="width:${value * 1.7}%"
        ></div>
      </div>

      <div class="province-value">
        ${value.toFixed(1)}%
      </div>
    `;

    row.addEventListener("click", () => {

      state.province = province.id;
      provinceFilter.value = province.id;

      updateDashboard();
    });

    provinceBars.appendChild(row);
  });
}


/* ============================================================
   8. DATA TABLE
============================================================ */

function renderDataTable() {

  dataTableBody.innerHTML = "";

  provinceData.forEach(province => {

    const row = document.createElement("tr");

    const finalValue =
      province.values[province.values.length - 1];

    let status = "Stable";

    if (finalValue >= 44) {
      status = "Above benchmark";
    }

    if (finalValue < 37) {
      status = "Attention";
    }

    row.innerHTML = `
      <td>
        <strong>${province.name}</strong>
      </td>

      <td>
        ${getSelectedTheme().name}
      </td>

      ${province.values
        .map(value => `<td>${value.toFixed(1)}</td>`)
        .join("")}

      <td>
        <span class="table-status">
          ${status}
        </span>
      </td>
    `;

    dataTableBody.appendChild(row);
  });
}


/* ============================================================
   9. KPI CALCULATION
============================================================ */

function updateKPIs() {

  const theme = getSelectedTheme();

  const {
    fromIndex,
    toIndex
  } = getYearIndexes();


  let startValue;
  let endValue;

  const province = getSelectedProvince();


  if (province) {

    startValue = province.values[fromIndex];
    endValue = province.values[toIndex];

  } else {

    startValue = theme.national[fromIndex];
    endValue = theme.national[toIndex];
  }


  document
    .getElementById("kpi-primary")
    .textContent =
      `${endValue.toFixed(1)}${theme.unit}`;


  const allFinalValues =
    provinceData.map(p => p.values[toIndex]);

  const range =
    Math.max(...allFinalValues) -
    Math.min(...allFinalValues);

  document
    .getElementById("kpi-range")
    .textContent =
      range.toFixed(1);


  const improvements =
    provinceData.map(p => ({
      name: p.name,
      change:
        p.values[toIndex] -
        p.values[fromIndex]
    }));

  improvements.sort(
    (a, b) => b.change - a.change
  );


  document
    .getElementById("kpi-best")
    .textContent =
      improvements[0].name;


  const lowest =
    [...provinceData]
      .sort(
        (a, b) =>
          a.values[toIndex] -
          b.values[toIndex]
      )[0];


  document
    .getElementById("kpi-attention")
    .textContent =
      lowest.name;
}


/* ============================================================
   10. UPDATE TREND CHART
============================================================ */

function updateTrendChart() {

  const theme = getSelectedTheme();
  const province = getSelectedProvince();

  let data;

  if (province) {
    data = province.values;
  } else {
    data = theme.national;
  }


  trendChart.data.datasets[0].data = data;

  trendChart.data.datasets[0].label =
    province
      ? province.name
      : "South Africa";

  trendChart.update();
}


/* ============================================================
   11. UPDATE COMPARISON CHART
============================================================ */

function updateComparisonChart() {

  const {
    toIndex
  } = getYearIndexes();


  comparisonChart.data.datasets[0].data =
    provinceData.map(
      province =>
        province.values[toIndex]
    );


  comparisonChart.data.datasets[0].label =
    String(state.to);


  comparisonChart.update();
}


/* ============================================================
   12. UPDATE TEXTUAL CONTEXT
============================================================ */

function updateContextText() {

  const theme = getSelectedTheme();

  const location = provinceName();


  overviewHeading.textContent =
    `${theme.name} · ${location}`;


  askContextText.textContent =
    `${location} · ${theme.name} · ${state.from}–${state.to}`;


  mainInsight.textContent =
    theme.insight;
}


/* ============================================================
   13. CENTRAL UPDATE
============================================================ */

function updateDashboard() {

  state.province =
    provinceFilter.value;

  state.theme =
    themeFilter.value;

  state.from =
    Number(yearFrom.value);

  state.to =
    Number(yearTo.value);


  updateContextText();
  updateKPIs();
  updateTrendChart();
  updateComparisonChart();
  renderDataTable();
}


/* ============================================================
   14. FILTER EVENTS
============================================================ */

[
  provinceFilter,
  themeFilter,
  yearFrom,
  yearTo
].forEach(filter => {

  filter.addEventListener(
    "change",
    updateDashboard
  );

});


document
  .getElementById("reset-filters")
  .addEventListener("click", () => {

    provinceFilter.value = "all";
    themeFilter.value = "employment";
    yearFrom.value = "2022";
    yearTo.value = "2026";

    updateDashboard();
  });


/* ============================================================
   15. ASK THE DATA
============================================================ */

const askButton =
  document.getElementById("ask-button");

const questionInput =
  document.getElementById("question-input");

const answerCard =
  document.getElementById("answer-card");


function generateEvidenceAnswer(question) {

  const theme =
    getSelectedTheme();

  const location =
    provinceName();

  const lower =
    question.toLowerCase();


  let title =
    "The strongest signal is uneven improvement.";

  let answer =
    `Across ${location}, the synthetic ${theme.name.toLowerCase()} evidence shows overall improvement during ${state.from}–${state.to}, while territorial differences remain visible. The pattern should therefore be interpreted as positive movement combined with persistent geographic inequality.`;


  if (
    lower.includes("attention") ||
    lower.includes("require") ||
    lower.includes("lowest")
  ) {

    title =
      "Eastern Cape shows the clearest attention signal.";

    answer =
      `In the current synthetic demonstration dataset, Eastern Cape remains below the national benchmark across the selected period. The result is persistent rather than a single-year fluctuation, which makes it a useful priority signal for deeper investigation.`;

  }


  if (
    lower.includes("strong") ||
    lower.includes("improve") ||
    lower.includes("best")
  ) {

    title =
      "The strongest positive trajectory appears in Gauteng.";

    answer =
      `Gauteng shows one of the strongest positive trajectories in the synthetic provincial series. Western Cape also remains comparatively strong. These patterns could be used as comparison cases before drawing any policy conclusion.`;

  }


  if (
    lower.includes("change") ||
    lower.includes("period")
  ) {

    title =
      "Improvement is broad, but its pace differs.";

    answer =
      `The principal change between ${state.from} and ${state.to} is a general upward movement in the selected synthetic indicator. However, provinces do not improve at the same rate, so the national trend alone would conceal meaningful territorial differences.`;

  }


  return {
    title,
    answer
  };
}


function submitQuestion(question) {

  if (!question.trim()) {
    return;
  }

  const response =
    generateEvidenceAnswer(question);


  answerCard.innerHTML = `

    <div class="answer-header">

      <span class="ai-badge">
        ✦ Evidence-assisted answer
      </span>

      <span>
        Demonstration
      </span>

    </div>

    <div class="user-question">
      “${question}”
    </div>

    <h3>
      ${response.title}
    </h3>

    <p>
      ${response.answer}
    </p>

    <div class="answer-evidence">

      <strong>
        Evidence used
      </strong>

      <div>
        ${provinceName()} ·
        ${getSelectedTheme().name} ·
        ${state.from}–${state.to} ·
        Provincial comparison
      </div>

    </div>

    <button
      class="text-button"
      data-answer-explorer
    >
      Inspect underlying data →
    </button>
  `;


  const explorerButton =
    answerCard.querySelector(
      "[data-answer-explorer]"
    );

  explorerButton.addEventListener(
    "click",
    () => openView("explorer")
  );


  answerCard.classList.add("answer-visible");
}


askButton.addEventListener("click", () => {

  submitQuestion(
    questionInput.value
  );

});


questionInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      submitQuestion(
        questionInput.value
      );
    }
  }
);


document
  .querySelectorAll(
    ".suggested-questions button"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        questionInput.value =
          button.textContent.trim();

        submitQuestion(
          button.textContent.trim()
        );
      }
    );
  });


/* ============================================================
   16. KNOWLEDGE PORTAL SEARCH
============================================================ */

knowledgeSearchInput.addEventListener(
  "input",
  () => {

    const query =
      knowledgeSearchInput
        .value
        .toLowerCase()
        .trim();


    document
      .querySelectorAll(".resource-card")
      .forEach(card => {

        const content =
          card.textContent
            .toLowerCase();

        card.style.display =
          content.includes(query)
            ? ""
            : "none";
      });
  }
);


/* ============================================================
   17. KNOWLEDGE TYPE FILTERS
============================================================ */

document
  .querySelectorAll(".knowledge-filter")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(
            ".knowledge-filter"
          )
          .forEach(item => {
            item.classList.remove("active");
          });


        button.classList.add("active");


        const filter =
          button
            .textContent
            .trim()
            .toLowerCase();


        document
          .querySelectorAll(".resource-card")
          .forEach(card => {

            if (filter === "all resources") {

              card.style.display = "";

              return;
            }


            const content =
              card.textContent
                .toLowerCase();


            const keyword =
              filter
                .replace("policy briefs", "policy brief")
                .replace("reports", "report")
                .replace("datasets", "dataset")
                .replace("methodologies", "methodology");


            card.style.display =
              content.includes(keyword)
                ? ""
                : "none";
          });
      }
    );
  });


/* ============================================================
   18. EXPORT DEMONSTRATION
============================================================ */

document
  .querySelectorAll(".secondary-button")
  .forEach(button => {

    if (
      button.textContent
        .toLowerCase()
        .includes("export")
    ) {

      button.addEventListener(
        "click",
        () => {

          const rows = [
            [
              "Province",
              "Indicator",
              ...years
            ],

            ...provinceData.map(
              province => [
                province.name,
                getSelectedTheme().name,
                ...province.values
              ]
            )
          ];


          const csv =
            rows
              .map(row =>
                row.join(",")
              )
              .join("\n");


          const blob =
            new Blob(
              [csv],
              {
                type:
                  "text/csv;charset=utf-8;"
              }
            );


          const url =
            URL.createObjectURL(blob);


          const link =
            document.createElement("a");

          link.href = url;

          link.download =
            "synthetic-development-indicators.csv";

          link.click();

          URL.revokeObjectURL(url);
        }
      );
    }
  });


/* ============================================================
   19. INITIALIZE
============================================================ */

renderProvinceBars();
renderDataTable();
updateDashboard();

console.log(
  "IDE SpA · UNDP-ZAF-00238 illustrative prototype initialized."
);
