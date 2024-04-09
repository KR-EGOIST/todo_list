// Firebase SDK 라이브러리 가져오기
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import {
  collection,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBKiu3vfUnvjHx5_M4XD25B6hY26LNPfEw',
  authDomain: 'sparta-77b4a.firebaseapp.com',
  projectId: 'sparta-77b4a',
  storageBucket: 'sparta-77b4a.appspot.com',
  messagingSenderId: '541201543394',
  appId: '1:541201543394:web:0913c44614cba2b523eebb',
  measurementId: 'G-97BRQ5KXHR',
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

// 삭제 함수
const delItem = (event) => {
  // console.log(event.target.parentElement);    // 삭제할 요소의 부모를 확인 , li 요소 전체가 출력됨
  const target = event.target.parentElement;

  if (confirm('정말 삭제하시겠습니까?') == true) {
    target.remove(); // remove 함수로 삭제
  } else {
    return false;
  }
};

// 수정 함수
const editItem = (event) => {
  // console.log(event.target.parentElement.children[0]); // // 삭제할 요소의 부모를 확인 후 자식 span 을 확인
  const target = event.target.parentElement.children[0];
  let temp = target.textContent; // 기존 내용 저장

  target.textContent = prompt('수정할 내용을 입력하세요', '할 일 입력');
  if (!target.textContent) {
    // 값을 입력하지 않으면
    return (target.textContent = temp); // 기존 내용 유지
  }
};

// 추가 함수
// 여기서 input.value 는 text 로 취급함
const addItem = (text) => {
  if (text.length == 0) {
    // 값을 입력하지 않으면
    alert('할 일을 입력하세요!');
  } else {
    const li = document.createElement('li'); // li 태그 생성
    const edit = document.createElement('button');
    const del = document.createElement('button'); // 삭제 버튼
    const span = document.createElement('span'); // 버튼과 합치기 위한 span 태그 생성

    span.textContent = text; // input의 값을 span 에 설정하기
    edit.textContent = '수정';
    edit.addEventListener('click', editItem);
    del.textContent = '삭제';
    del.addEventListener('click', delItem);

    li.appendChild(span);
    li.appendChild(edit);
    li.appendChild(del);
    ul.appendChild(li);
  }
};

const handler = (event) => {
  event.preventDefault(); // 새로고침 방지
  addItem(input.value); // addItem 함수 실행하는데 input.value 를 전달
  input.value = ''; // 하나 입력을 하면 input 공간이 비어있음
  input.focus(); // input 태그에 계속 입력할 수 있도록 focus
};

// form 으로 한 이유는 엔터 나 버튼 클릭으로 작동하게 할려고
// form 이 submit 이벤트가 일어날 때 handler 함수가 실행
form.addEventListener('submit', handler);
