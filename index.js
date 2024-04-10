// Firebase SDK 라이브러리 가져오기
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

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

// 추가 함수
$('#add-btn').click(async function () {
  let text = $('#input').val();

  if (text.length == 0) {
    // 값을 입력하지 않으면
    alert('할 일을 입력하세요!');
  } else {
    let doc = {
      text: text,
    };

    await addDoc(collection(db, 'todolist'), doc);
    window.location.reload();
  }
});

// 데이터 가져오기
let docs = await getDocs(collection(db, 'todolist'));
docs.forEach((doc) => {
  let row = doc.data();
  let id = doc.id;
  let text = row['text'];

  let temp_html = `
  <li>
    <span>${text}</span>
    <button value="${id}" class="edit-btn">수정</button>
    <button value="${id}" class="del-btn">삭제</button>
  </li>`;
  $('#Todo').append(temp_html);
});

// 삭제 함수
$('.del-btn').click(async function () {
  if (confirm('정말 삭제하시겠습니까?') == true) {
    await deleteDoc(doc(db, 'todolist', this.value));
    window.location.reload();
  } else {
    return false;
  }
});

// 수정 함수
$('.edit-btn').click(async function () {
  let target = this.parentElement.children[0];
  let temp = target.textContent; // 기존 내용 저장

  target.textContent = prompt('수정할 내용을 입력하세요', '할 일 입력');

  if (!target.textContent) {
    // 값을 입력하지 않으면
    return (target.textContent = temp);
  } else {
    updateDoc(doc(db, 'todolist', this.value), {
      text: target.textContent,
    });
  }
});

const handler = (event) => {
  event.preventDefault(); // 새로고침 방지
  input.value = ''; // 하나 입력을 하면 input 공간이 비어있음
};

// form 으로 한 이유는 엔터 나 버튼 클릭으로 작동하게 할려고
// form 이 submit 이벤트가 일어날 때 handler 함수가 실행
form.addEventListener('submit', handler);
