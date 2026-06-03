
let userName = "";
let savedSkinType = "";
let savedConcern = 0;

const skinRoutine = {

  oily: {
    morning: [
      "약산성 클렌저로 가볍게 세안",
      "유분감 적은 토너 사용",
      "산뜻한 수분 세럼/젤 크림 사용",
      "끈적임 덜한 선크림 바르기"
    ],
    evening: [
      "클렌징 → 꼼꼼한 세안",
      "피지·각질 케어 제품(BHA 등) 주 2~3회 사용",
      "가벼운 수분크림으로 마무리"
    ]
  },

  dry: {
    morning: [
      "미온수 또는 순한 클렌저 사용",
      "보습 토너로 수분 공급",
      "세럼 또는 에센스로 보습 강화",
      "크림 충분히 바르기",
      "촉촉한 선크림 사용"
    ],
    evening: [
      "자극 적은 클렌징",
      "수분·보습 제품 레이어링",
      "영양감 있는 크림으로 마무리",
      "필요 시 슬리핑팩 사용"
    ]
  },

  combination: {
    morning: [
      "순한 클렌저 사용",
      "수분 토너 사용",
      "T존은 가볍게, U존은 촉촉하게 보습",
      "산뜻한 선크림 바르기"
    ],
    evening: [
      "꼼꼼한 클렌징",
      "유분 많은 부위는 피지 관리",
      "건조한 부위는 보습 강화",
      "피부 상태에 맞춰 부분 케어하기"
    ]
  },

  sensitive: {
    morning: [
      "저자극 클렌저 사용",
      "진정 토너로 피부 정돈",
      "세라마이드·판테놀 성분 보습제 사용",
      "무기자차 또는 저자극 선크림 바르기"
    ],
    evening: [
      "최소한의 자극으로 클렌징",
      "진정 위주의 스킨케어 사용",
      "보습크림으로 피부 장벽 보호",
      "각질 제거·강한 성분 사용은 주 1회 이하"
    ]
  }
};

let favoriteProducts =
  JSON.parse(localStorage.getItem("favoriteProducts")) || [];

const KAKAO_KEY = "fa5f0b80f6de6597e568cf42cb127742";

if (window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init(KAKAO_KEY);
}

const skinData = {
  dry: {
    title: "🌵 건성 피부",
    summary: "수분과 유분이 부족해서 세안 후 당김, 각질, 푸석함이 잘 나타나는 피부입니다.",
    routine: [
      "아침: 약산성 클렌저 또는 물세안",
      "토너: 수분 토너를 손으로 여러 번 흡수",
      "세럼: 히알루론산, 판테놀 성분 추천",
      "크림: 세라마이드, 시어버터 계열 보습 크림",
      "선크림: 촉촉한 크림 타입 선크림"
    ],
    ingredients: ["히알루론산", "세라마이드", "판테놀", "글리세린", "스쿠알란"],
    products: [
      {
        name: "라운드랩 자작나무 수분크림",
        type: "크림",
        reason: "가볍지만 수분감이 있어 건성 피부 데일리 크림으로 사용하기 좋음"
      },
      {
        name: "일리윤 세라마이드 아토 집중 크림",
        type: "크림",
        reason: "피부 장벽 보습에 적합하고 건조한 부위에 사용하기 좋음"
      },
      {
        name: "토리든 다이브인 세럼",
        type: "세럼",
        reason: "수분 공급 중심 제품이라 속건조 관리에 적합"
      }
    ]
  },

  oily: {
    title: "💧 지성 피부",
    summary: "피지 분비가 많아 얼굴이 쉽게 번들거리고 모공, 블랙헤드, 트러블이 생기기 쉬운 피부입니다.",
    routine: [
      "아침: 젤 타입 약산성 클렌저 사용",
      "토너: 산뜻한 수분 토너 사용",
      "세럼: 나이아신아마이드 또는 피지 조절 성분",
      "로션: 가벼운 젤 크림 사용",
      "선크림: 유분감 적은 산뜻한 선크림"
    ],
    ingredients: ["나이아신아마이드", "살리실산", "티트리", "징크", "녹차추출물"],
    products: [
      {
        name: "닥터지 레드 블레미쉬 클리어 수딩 크림",
        type: "수딩 크림",
        reason: "가볍고 산뜻해서 지성 피부가 부담 없이 사용 가능"
      },
      {
        name: "아누아 어성초 77 수딩 토너",
        type: "토너",
        reason: "피지와 진정 관리에 적합"
      },
      {
        name: "이니스프리 화산송이 모공 마스크",
        type: "팩",
        reason: "피지와 모공 관리용으로 주 1~2회 사용 가능"
      }
    ]
  },

  combination: {
    title: "⚖️ 복합성 피부",
    summary: "T존은 번들거리고 볼이나 턱은 건조한 피부입니다. 부위별 관리가 중요합니다.",
    routine: [
      "아침: 순한 클렌저로 가볍게 세안",
      "T존: 산뜻한 수분 제품 사용",
      "U존: 보습 크림을 충분히 사용",
      "세럼: 수분 중심 세럼 사용",
      "선크림: 너무 무겁지 않은 로션 타입 사용"
    ],
    ingredients: ["히알루론산", "나이아신아마이드", "판테놀", "녹차추출물", "알란토인"],
    products: [
      {
        name: "에스트라 아토베리어365 로션",
        type: "로션",
        reason: "무겁지 않으면서 보습감이 있어 복합성 피부에 적합"
      },
      {
        name: "라운드랩 독도 토너",
        type: "토너",
        reason: "자극이 적고 기본 수분 관리용으로 사용하기 좋음"
      },
      {
        name: "토리든 다이브인 수딩 크림",
        type: "크림",
        reason: "가벼운 수분감으로 T존과 U존 모두 사용 가능"
      }
    ]
  },

  sensitive: {
    title: "🌸 민감성 피부",
    summary: "외부 자극에 쉽게 붉어지고 따가움, 가려움, 트러블 반응이 나타나기 쉬운 피부입니다.",
    routine: [
      "아침: 물세안 또는 매우 순한 클렌저 사용",
      "토너: 알코올 없는 저자극 토너 사용",
      "세럼: 진정 성분 중심 제품 사용",
      "크림: 피부 장벽 회복 크림 사용",
      "선크림: 무기자차 또는 저자극 선크림 추천"
    ],
    ingredients: ["시카", "판테놀", "알란토인", "마데카소사이드", "세라마이드"],
    products: [
      {
        name: "에스트라 아토베리어365 크림",
        type: "크림",
        reason: "피부 장벽 관리에 적합한 저자극 보습 크림"
      },
      {
        name: "라로슈포제 시카플라스트 밤",
        type: "밤",
        reason: "민감하고 건조한 부위 진정 관리에 적합"
      },
      {
        name: "아비브 어성초 스팟 패드",
        type: "패드",
        reason: "민감 피부의 진정 관리용으로 사용 가능"
      }
    ]
  },
};

const questionData = [
  {
    question: "아침에 일어났을 때 얼굴 상태는 어떤가요?",
    answers: [
      { text: "전체적으로 번들거린다", value: "oily" },
      { text: "코·이마만 번들거린다", value: "combination" },
      { text: "전체적으로 건조하다", value: "dry" },
      { text: "붉거나 예민한 느낌이 있다", value: "sensitive" }
    ]
  },

  {
    question: "여름철 피부 상태에 가장 가까운 것은?",
    answers: [
      { text: "쉽게 번들거린다", value: "oily" },
      { text: "T존만 유분이 많다", value: "combination" },
      { text: "에어컨 때문에 건조하다", value: "dry" },
      { text: "열감이나 자극이 심하다", value: "sensitive" }
    ]
  },

  {
    question: "겨울철 피부 상태에 가장 가까운 것은?",
    answers: [
      { text: "계절 상관없이 기름진 편이다", value: "oily" },
      { text: "볼은 건조하고 T존은 기름진다", value: "combination" },
      { text: "심하게 건조하고 각질이 생긴다", value: "dry" },
      { text: "쉽게 붉어지고 예민해진다", value: "sensitive" }
    ]
  },

  {
    question: "평소 선크림 사용 후 피부 느낌은?",
    answers: [
      { text: "금방 기름진다", value: "oily" },
      { text: "T존은 번들거리지만 볼은 괜찮다", value: "combination" },
      { text: "사용 후 피부가 당기거나 건조한 느낌이 든다", value: "dry" },
      { text: "따갑거나 붉어지는 등 자극이 느껴진다", value: "sensitive" }
    ]
  },

  {
    question: "평소 피부를 만졌을 때 가장 가까운 느낌은?",
    answers: [
      { text: "건조하고 거칠다", value: "dry" },
      { text: "T존은 번들거리고 볼은 건조하다", value: "combination" },
      { text: "미끌거리고 유분이 많다", value: "oily" },
      { text: "피부가 쉽게 예민해지고 자극에 민감하게 반응한다", value: "sensitive" }
    ]
  },

  {
    question: "세안 후 피부 느낌은?",
    answers: [
      { text: "많이 당기고 건조하다", value: "dry" },
      { text: "당김은 적지만 코와 이마가 먼저 유분감이 생긴다", value: "combination" },
      { text: "당김이 거의 없고 금방 유분이 올라온다", value: "oily" },
      { text: "따갑거나 쉽게 붉어진다", value: "sensitive" }
    ]
  },

  {
    question: "오후가 되면 피부 상태는 어떤가요?",
    answers: [
      { text: "피부가 건조하고 각질이 생긴다", value: "dry" },
      { text: "코와 이마 부분만 번들거린다", value: "combination" },
      { text: "얼굴 전체가 쉽게 번들거린다", value: "oily" },
      { text: "피부가 붉어지거나 가려운 느낌이 든다", value: "sensitive" }
    ]
  },

  {
    question: "평소 피지나 블랙헤드 고민이 있나요?",
    answers: [
      { text: "거의 없다", value: "dry" },
      { text: "코 주변만 있다", value: "combination" },
      { text: "얼굴 전체에 자주 생긴다", value: "oily" },
      { text: "자극받으면 더 심해진다", value: "sensitive" }
    ]
  },

  {
    question: "트러블은 얼마나 생기나요?",
    answers: [
      { text: "거의 안 생긴다", value: "dry" },
      { text: "특정 부위에만 생긴다", value: "combination" },
      { text: "자주 생긴다", value: "oily" },
      { text: "자극성 트러블이 잘 생긴다", value: "sensitive" }
    ]
  },

  {
    question: "새로운 화장품을 사용했을 때 피부 반응은 어떤가요?",
    answers: [
      { text: "별다른 변화가 없지만 건조함이 느껴진다", value: "dry" },
      { text: "T존만 유분이 증가한다", value: "combination" },
      { text: "유분이 늘거나 여드름이 생긴다", value: "oily" },
      { text: "붉어짐, 가려움, 따가움이 생긴다", value: "sensitive" }
    ]
  }


];

function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab");
  const forms = document.querySelectorAll(".form-section");

  tabs.forEach(tab => tab.classList.remove("active"));
  forms.forEach(form => form.classList.remove("active"));

  if (tabId === "login") {
    tabs[0].classList.add("active");
  } else {
    tabs[1].classList.add("active");
  }

  document.getElementById(tabId).classList.add("active");
}

async function login() {

  const username =
    document.getElementById("signupName").value.trim();

  const email =
    document.getElementById("signupEmail").value;

  const password =
    document.getElementById("signupPassword").value;

  if (email.trim() === "" || password.trim() === "") {
    alert("이메일과 비밀번호를 입력하세요.");
    return;
  }

  const response = await fetch(
    "http://localhost:3000/login",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email,
        password
      })
    }
  );

  const result = await response.json();

  console.log(result);

  if (result.success) {
    document.getElementById("loginPage").style.display = "none";

    document.getElementById("mainPage").style.display = "block";

    document.getElementById("welcomeText").innerText = result.username + "님 환영합니다 😎";

  } else {

    alert("이메일 또는 비밀번호가 틀렸습니다.");
  }
}

async function signup() {

  const username =
    document.getElementById("signupName").value.trim();

  const email =
    document.getElementById("signupEmail2").value.trim();

  const password =
    document.getElementById("signupPassword2").value.trim();

  const passwordCheck =

    document.getElementById("signupPasswordCheck").value.trim();

  if (
    username === "" ||
    email === "" ||
    password === "" ||
    passwordCheck === ""
  ) {
    alert("모든 정보를 입력해주세요");
    return;

  }

  if (password !== passwordCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const response = await fetch(
    "http://localhost:3000/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password,
        skin_type: ""
      })
    }
  )

  const result = await response.json();
  console.log(result);

  alert(result.message);

  showLogin();
}

function kakaoLogin() {
  if (!window.Kakao) {
    alert("카카오 SDK를 불러오지 못했습니다.");
    return;
  }

  window.Kakao.Auth.login({
    success: function () {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: function (response) {
          const nickname = response.kakao_account?.profile?.nickname || "카카오 사용자";
          const profileImage = response.properties?.profile_image
            || "https://cdn-icons-png.flaticon.com/512/847/847969.png";

          showMainPage(nickname, profileImage);
        },
        fail: function () {
          showMainPage("카카오 사용자");
        }
      });
    },
    fail: function () {
      alert("카카오 로그인에 실패했습니다.");
    }
  });
}

function sampleSocialLogin(type) {
  alert(type + " 로그인은 현재 예시입니다.");
  showMainPage(type + " 사용자");
}

function showMainPage(name, image) {
  userName = name;

  document.getElementById("loginPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";

  document.getElementById("welcomeText").innerText =
    name + "님 환영합니다 😎";

  if (image) {
    document.getElementById("profileImage").src = image;
  }

  changeContent("home");
}

function logout() {
  resetToLogin();
}

function resetToLogin() {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("loginPage").style.display = "flex";
  savedSkinType = "";
}

function changeContent(type, button) {
  const contentBox = document.getElementById("contentBox");

  document.querySelectorAll(".menu button").forEach(btn => {
    btn.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  if (type === "home") {
    contentBox.innerHTML = `
        <h2>🏠 Skin Recipe 홈</h2>
        <p>
          Skin Recipe는 피부 타입을 간단히 진단하고,
          피부 상태에 맞는 맞춤 스킨케어 루틴과 추천 제품을 제공하는 웹페이지입니다.
        </p>

        <div class="routine-card">
          <b>📌 사용 방법</b><br><br>
          1️⃣ 피부타입 진단 메뉴를 선택합니다.<br>
          2️⃣ 질문에 답하고 피부 결과를 확인합니다.<br>
          3️⃣ 맞춤 추천 메뉴에서 추천 루틴을 확인합니다.<br>
          4️⃣ 피부 타입별 추천 성분과 제품을 확인합니다.
        </div>

        <div class="routine-card">
          <b>✨ 주요 기능</b><br><br>
          ✓ 피부 타입 진단<br>
          ✓ 피부별 추천 루틴 제공<br>
          ✓ 추천 성분 안내<br>
          ✓ 추천 제품 추천<br>
          ✓ 카카오 로그인 기능<br>
          ✓ 개인 맞춤 스킨케어 추천
        </div>

        <div class="routine-card">
          <b>💡 추천 사용 팁</b><br><br>
          • 피부 진단은 세안 후 상태 기준으로 진행해주세요.<br>
          • 계절에 따라 피부 타입은 달라질 수 있습니다.<br>
          • 추천 제품은 참고용이며 피부 상태에 따라 다를 수 있습니다.
        </div>  
      `;
  }

  else if (type === "diagnosis") {
    showDiagnosis();
  }

  else if (type === "recommend") {

    if (savedSkinType === "") {

      contentBox.innerHTML = `
          <h2>💄 맞춤 추천</h2>
          <p>아직 피부 타입 진단 결과가 없습니다.</p>

          <div class="routine-card">
            먼저 <b>피부타입 진단</b>을 진행하면 맞춤 추천을 확인할 수 있습니다.
          </div>
        `;
    } else {
      showRecommendation(savedSkinType, savedConcern);
    }
  }

  else if (type === "mypage") {

    const favorites =
      JSON.parse(localStorage.getItem("favoriteProducts")) || [];

    contentBox.innerHTML = `
        <h2>👤 마이페이지</h2>
        <p>${userName}님의 피부 관리 정보입니다.</p>

        <div class="routine-card">
          <b>최근 진단 결과</b><br>
          ${savedSkinType ? skinData[savedSkinType].title : "아직 진단 결과가 없습니다."}
        </div>

        <div class="routine-card">

<h3>☀️ 아침 루틴</h3>

${savedSkinType
        ?

        skinRoutine[savedSkinType].morning.join("<br>")

        :

        "진단 후 루틴이 표시됩니다."

      }

</div>

<div class="routine-card">

<h3>🌙 저녁 루틴</h3>

${savedSkinType
        ?

        skinRoutine[savedSkinType].evening.join("<br>")

        :

        "진단 후 루틴이 표시됩니다."

      }

</div>

        <div class="routine-card">
        <h3>❤️ 찜한 상품</h3>

        ${favorites.length > 0

        ?

        favorites.map((product, index) => `

        <div class="product-card">

        <img
        src="${product.image_url}"
        style="
        width:150px;
        height:150px;
        object-fit:contain;
        ">

        <h4>${product.product_name}</h4>

        <span class="product-category">
        ${product.category}
        </span>

        <p>${product.description1 || ""}</p>
        <p>${product.description2 || ""}</p>

        <button onclick="removeFavorite(${index})">
        🗑️ 삭제
        </button>

        </div>

        `).join("")

        :

        "<p>찜한 상품이 없습니다.</p>"

      }

        </div>

        `;

  }

  else if (type === "search") {

    contentBox.innerHTML = `
    <h2>🔍 제품 검색</h2>

    <div class="search-box">

      <input
        type="text"
        id="searchKeyword"
        placeholder="제품명을 입력하세요"
      >

      <button onclick="searchProduct()">
        검색
      </button>

    </div>

    <div id="searchResult"></div>
  `;
  }

  else {
    showSkinInfo(type);
  }
}

function showDiagnosis() {
  const contentBox = document.getElementById("contentBox");

  let html = `<h2>🧪 피부타입 진단</h2>`;

  questionData.forEach((item, index) => {
    html += `
        <div class="question">
          <h3>${index + 1}. ${item.question}</h3>
      `;

    item.answers.forEach(answer => {
      html += `
          <label>
            <input type="radio" name="q${index}" value="${answer.value}">
            ${answer.text}
          </label>
        `;
    });

    html += `</div>`;
  });

  html += `
      <button class="result-btn" onclick="checkSkinType()">피부 타입 결과 보기 😎</button>
      <div class="result-text" id="resultText"></div>
    `;

  contentBox.innerHTML = html;
}

function checkSkinType() {
  const count = {
    dry: 0,
    oily: 0,
    combination: 0,
    sensitive: 0,
  };

  for (let i = 0; i < questionData.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);

    if (!selected) {
      alert("모든 질문에 답해주세요 😥");
      return;
    }

    count[selected.value]++;
  }

  savedSkinType = Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );

  console.log("savedSkinType =", savedSkinType);
  console.log("skinData =", skinData);
  console.log("skinData[savedSkinType] =", skinData[savedSkinType]);

  document.getElementById("resultText").innerHTML = `
    <h3>${skinData[savedSkinType].title}입니다 😎</h3>

    <p style="margin-top:15px;">
      현재 가장 고민되는 피부 고민을 선택해주세요.
    </p>

    <div style="margin-top:15px; display:flex; gap:10px; flex-wrap:wrap;">
      <button onclick="selectConcern(1)">수분 부족</button>
      <button onclick="selectConcern(2)">피지 과다</button>
      <button onclick="selectConcern(3)">트러블</button>
      <button onclick="selectConcern(4)">민감함</button>
      <button onclick="selectConcern(5)">모공·피부결</button>
    </div>
  `;
}

function selectConcern(concern) {

  savedConcern = concern;

  changeContent("recommend");

}

async function showRecommendation(type, concern) {

  savedSkinType = type;
  savedConcern = concern;

  const skinNames = {
    dry: "🌵 건성 피부",
    oily: "💧 지성 피부",
    combination: "⚖️ 복합성 피부",
    sensitive: "🌸 민감성 피부"
  };

  const contentBox = document.getElementById("contentBox");

  try {

    const response = await fetch(
      `http://localhost:3000/recommendations?skin=${type}&concern=${concern}`
    );

    const result = await response.json();

    window.currentProducts = result.data;

    if (!result.success) {
      contentBox.innerHTML = `
          <h2>💄 맞춤 추천</h2>
          <p>추천 데이터를 불러오지 못했습니다.</p>
        `;
      return;
    }

    contentBox.innerHTML = `
    <h2>${skinNames[type]} 맞춤 추천 </h2>

    <div class="routine-card">
    <h3>📋 피부 특징</h3>
    <p>${skinData[type].summary}</p>
    </div>

    <div class="routine-card">
    <h3>🧪 추천 성분</h3>
    <div class="tag-box">
    ${skinData[type].ingredients
      .map(item => `<span class="tag">${item}</span>`)
      .map(item => `<span class="tag">${item}</span>`)
      .join("")}
    </div>
    </div>

    <div class="routine-card">
    <h3>❤️ 추천 제품</h3>

    <div class="products-grid">
    ${result.data.map((product, index) => `
    <div class="product-card">

    <button
    class="favorite-btn"
    onclick="addFavorite(${index})"
    >
    ❤️ 찜하기
    </button>

    <img src="${product.image_url}"
    alt="${product.product_name}">


    <h3>${product.product_name}</h3>

    <span class="product-category">
    ${product.category}
    </span>

    <p>${product.description1 || ""}</p>
    <p>${product.description2 || ""}</p>

    </div>

    `).join("")}
    </div>

   


    </div>
    `;



  } catch (error) {

    console.error(error);

    contentBox.innerHTML = `
        <h2>💄 맞춤 추천</h2>
        <p>서버 연결 실패 😥</p>
      `;
  }
}

function showSkinInfo(type) {
  const data = skinData[type];
  const contentBox = document.getElementById("contentBox");

  contentBox.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.summary}</p>

      <div class="routine-card">
        <b>관리 루틴</b><br>
        ${data.routine.join("<br>")}
      </div>

      <div class="routine-card">
        <b>추천 제품</b>
        <div class="product-list">
          ${data.products.map(product => `
            <div class="product-card">
              <h4>${product.name}</h4>
              <p><b>종류:</b> ${product.type}</p>
              <p><b>추천 이유:</b> ${product.reason}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
}

async function searchProduct() {

  const keyword =
    document.getElementById("searchKeyword").value.trim();

  if (keyword === "") {
    alert("검색어를 입력하세요");
    return;
  }

  const response =
    await fetch(
      `http://localhost:3000/search?keyword=${keyword}`
    );

  const result =
    await response.json();

  const resultBox =
    document.getElementById("searchResult");

  if (result.data.length === 0) {

    resultBox.innerHTML =
      "<p>검색 결과가 없습니다 😥</p>";

    return;
  }

  resultBox.innerHTML = `

    <div class="products-grid">

      ${result.data.map(product => `

        <div class="product-card">

          <img src="${product.image_url}">

          <h3>${product.product_name}</h3>

          <span class="product-category">
            ${product.category}
          </span>

          <p>${product.description1}</p>
          <p>${product.description2}</p>

        </div>

      `).join("")}

    </div>

  `;
}

function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function addFavorite(index) {

  const product = window.currentProducts[index];

  let favorites =
    JSON.parse(localStorage.getItem("favoriteProducts")) || [];

  const exists = favorites.some(
    item => item.product_name === product.product_name
  );

  if (exists) {
    alert("이미 찜한 상품입니다 😎");
    return;
  }

  favorites.push(product);

  localStorage.setItem(
    "favoriteProducts",
    JSON.stringify(favorites)
  );

  alert("찜 완료 ❤️");
}

function removeFavorite(index) {

  let favorites =
    JSON.parse(localStorage.getItem("favoriteProducts")) || [];

  favorites.splice(index, 1);

  localStorage.setItem(
    "favoriteProducts",
    JSON.stringify(favorites)
  );

  changeContent("mypage");
}

function selectConcern(concern) {
  savedConcern = concern;
  changeContent("recommend");
}