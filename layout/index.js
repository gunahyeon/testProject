const URL = "https://jsonplaceholder.typicode.com/users";
const URL1 = "https://jsonplaceholder.typicode.com/posts";

//이메일
var email = document.querySelector("#email");
//이름
var username = document.querySelector("#username");
//로그인 버튼
var login = document.querySelector("#login");
//포스트 div
var posts = document.querySelector("#posts");
//포스트 클래스
var post = document.getElementsByClassName("post");

//로그인 성공시 div
var displayUsernameDIV = document.querySelector("#displayUsernameDIV");

initial();

//초기화면
function initial() {
  email.value = "";
  username.value = "";
  email.focus();
}

//버튼 이벤트
login.addEventListener("click", function () {
  if (login.innerHTML == "Logout") {
    //로그아웃
    location.reload();
  }
  if (login.innerHTML == "Login") {
    //로그인
    userCheck();
  }
});

//유저 정보 확인
function userCheck() {
  axios
    .get(URL, {
      params: {
        email: email.value,
        username: username.value,
      },
    })
    .then(function (response) {
      var userId = response.data[0].id;
      var userName = response.data[0].username;
      statusOK(userId);
      displayUsername(userName);
      login.innerHTML = "" + "Logout";
    })
    .catch(function (error) {
      alert("회원 정보가 없습니다. 다시 입력해주세요.");
      initial();
    });
}

//유저 정보 확인 성공시
function statusOK(userId) {
  axios
    .get(URL1, {
      params: {
        userId: userId,
      },
    })
    .then(function (response) {
      response.data.forEach((element, i) => {
        var postTitle = response.data[i].title;
        var postBody = response.data[i].body;
        postShow(postTitle, postBody);
      });
    });
  return;
}

//현재 유저 이름 디스플레이
function displayUsername(userName) {
  displayUsernameDIV.innerHTML =
    "Hello, <br>" + userName + "!<br>Check Your Posts.";
  displayUsernameDIV.style.cssText =
    "width: 100%; height:220px; padding: 15px; margin: auto; font-size: 40px;";
}

//포스트 펼치기
function postShow(postTitle, postBody) {
  posts.innerHTML +=
    `
  <div class="post card mb-1">
  <div class="card-header">
    <div class="post-title">
      <span class="btn btn-primary post-title-span">Title:</span>
      <p class="post-title-p">` +
    postTitle +
    `</p>
    </div>
  </div>
  <div class="card-body text-secondary">
    <p class="card-text">` +
    postBody +
    `
    </p>
  </div>
  </div>`;
}

//포스트 숨기기
function postHide() {
  posts.innerHTML = "";
}
