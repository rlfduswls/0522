// (1) querySelector를 이용하여 해당 요소를 선택하여 title 변수에 할당하세요.
const title = document.querySelector(".section-title h1")

// (2) 
const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

//async와 await연산자를 사용하면 .then을 사용하지 않고도 프로미스를 resolve 한 값을 알 수 있음
const fetchFollowers = async () => {
  //response에 fetch(url)을 저장
  //response.json()을 통해 response를 json파일로 변환하여 data에 저장
  const response=await fetch(url);
  const data=await response.json();
    // 데이터 가져오기
	return data;
};
let index=0;//index

const init = async () => {
  // fetchFollowers 함수의 반환값을 followers에 저장하기
	const followers = await fetchFollowers();

	// Loading -> Pagination 텍스트 수정
	title.textContent = "Pagination";
  pages=paginate(followers);
  setupUI();
};

init();

// (1) querySelector를 이용하여 해당 요소를 선택하여 container 변수에 할당하세요.
const container = document.querySelector('.container');

const displayFollowers = (followers) => {
  let newFollowers = followers.map((person) => {
			// map 함수를 활용하여 각 팔로워들의 정보를 보여주는 코드를 작성하세요.
			// avatar_url은 프로필 사진 url, login은 팔로워의 이름, html_url은 팔로워의 github 주소입니다.
      //구조 분해 할당: 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 표현식
      const { avatar_url, login, html_url } = person;
      return`
      <article class="card">
      <img src="${avatar_url}", alt='person'/>
      <h4>${login}</h4>
      <a href="${html_url}" class="btn">view profile</a>
      </article>`;
			// 잘 모르겠다면 5/11 정기세션 실습 문제 2번 코드를 참고해보세요!
    });

	newFollowers = newFollowers.join('');//배열 합치기
	container.innerHTML = newFollowers;
};

// (1) querySelector를 이용하여 해당 요소를 선택하여 container 변수에 할당하세요.
const btnContainer = document.querySelector(".btn-container")

// (2)
//activeIndex는 
const displayButtons = (container, pages, activeIndex) => {
  //page를 나눔
  let btns = pages.map((_,pageIndex) => {

		return `<button class="page-btn ${activeIndex===pageIndex ? "active-btn" :"" 
  }" data-index="${pageIndex}">
		    ${pageIndex + 1}</button>`;
  });
  //버튼 맨 뒤에 next를 달아줌
  //버튼 맨 앞에 prev를 달아줌
  btns.push(`<button class="next-btn">next</button>`);
  btns.unshift(`<button class="prev-btn">prev</button>`);
  //btns를 합치고 innerHTML로 글자를 보여줌
  container.innerHTML = btns.join("");
};

// 버튼에 이벤트 달기
btnContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-container")) return;

  if (e.target.classList.contains("page-btn")) {
    index = parseInt(e.target.data-set.index);
  }

  if(e.target.classList.contains("next-btn")){
    index=index+1;
    if(index>9){
      index=9
    }
  }
  if(e.target.classList.contains("prev-btn")){
    index=index-1;
    if(index<0){
      index=0;
    }
  }
	setupUI();
	// Next 버튼을 누르면 index가 증가하고, Prev 버튼을 누르면 index가 감소하도록 조건문을 작성하세요.
	// 주의) 인덱스의 범위는 0 이상 10 이하입니다.

});


let pages = [];  // 팔로워 정보를 10개씩 나눠서 저장할 배열

// paginate() 함수는 팔로워 전체를 입력으로 받아 10명씩 나눠서 저장하는 함수입니다.
const paginate = (followers) => {
  const itemsPerPage = 10;
  //Math.ceil은 정수 올림 즉, followers의 길이를 10으로 나눠서 정수 올림한수를 반환
  const numberOfPages = Math.ceil(followers.length / itemsPerPage);
//Array.from()메서드는 유사 배열 객체나 반복가능한 객체를 얕게 복사해서 새로운 객체를 만듦

  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
		
		// slice 함수에 올바른 파라미터를 넣어주세요.
    return followers.slice(start, start+itemsPerPage);
  });

  return newFollowers;
};

const setupUI = () => {
  displayFollowers(pages[index] ); 
  displayButtons(btnContainer, pages, index);
};

