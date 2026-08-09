// index.js - 首页表单验证与跳转逻辑

// 获取表单元素
const form = document.querySelector('.form-container');
const subjectSelect = document.getElementById('subject');
const nameInput = document.getElementById('uname');
const idCardInput = document.getElementById('id-card');

// 存储 JSON 数据的变量
let userInfoData = [];

// 页面加载时获取 info.json 数据
fetch('json/info.json')
  .then(response => response.json())
  .then(data => {
    userInfoData = data.userInfo;

    // 从 localStorage 恢复 mainTitle（持久化存储，再次打开浏览器时仍可显示）
    const savedMainTitle = localStorage.getItem('mainTitle');
    if (savedMainTitle) {
      const mainTitleEl = document.querySelector('.main-title-text');
      if (mainTitleEl) {
        mainTitleEl.textContent = savedMainTitle;
      }
    }
  })
  .catch(err => {
    console.error('获取数据失败:', err);
  });

// 表单提交事件
form.addEventListener('submit', function(e) {
  // 阻止表单默认提交行为
  e.preventDefault();

  // 获取用户输入的值
  const subjectValue = subjectSelect.value;
  const nameValue = nameInput.value.trim();
  const idCardValue = idCardInput.value.trim();

  // 基本非空验证
  if (!nameValue || !idCardValue) {
    alert('请填写完整的考生信息');
    return;
  }

  // 在 userInfo 中查找匹配的考生信息
  const matchedUser = userInfoData.find(user => {
    // 比对姓名和证件号码/准考证号
    const nameMatch = user.uname === nameValue;
    const idMatch = user.idCard === idCardValue || String(user.writtenExamNum) === idCardValue;
    return nameMatch && idMatch;
  });

  if (!matchedUser) {
    // 证件号码或准考证号未匹配成功
    alert('考生信息有误，请重新输入');
    return;
  }

  // 姓名和证件号码匹配成功，检查科目是否匹配
  if (matchedUser.subject !== subjectValue) {
    // 科目信息未匹配成功
    alert('未查询到成绩信息，请重新选择科目');
    return;
  }

  // 全部匹配成功，动态渲染 mainTitle 到页面
  const mainTitleEl = document.querySelector('.main-title-text');
  if (mainTitleEl) {
    mainTitleEl.textContent = matchedUser.mainTitle;
  }

  // 将 mainTitle 和所有数据存入存储（mainTitle 用 localStorage 持久化，其余用 sessionStorage 保护隐私）
  localStorage.setItem('mainTitle', matchedUser.mainTitle);
  sessionStorage.setItem('subject', subjectSelect.options[subjectSelect.selectedIndex].text);
  sessionStorage.setItem('subjectValue', subjectValue);
  sessionStorage.setItem('uname', matchedUser.uname);
  sessionStorage.setItem('idCard', matchedUser.idCard);
  sessionStorage.setItem('school', matchedUser.school);
  sessionStorage.setItem('scoreReport', matchedUser.scoreReport);
  sessionStorage.setItem('writtenExamNum', matchedUser.writtenExamNum);
  sessionStorage.setItem('writtenTotal', matchedUser.writtenTotal);
  sessionStorage.setItem('writtenListening', matchedUser.writtenListening);
  sessionStorage.setItem('writtenReading', matchedUser.writtenReading);
  sessionStorage.setItem('writtenWriting', matchedUser.writtenWriting);
  sessionStorage.setItem('oralExamNum', matchedUser.oralExamNum);
  sessionStorage.setItem('oralLevel', matchedUser.oralLevel);
  sessionStorage.setItem('noticeTime', matchedUser.noticeTime);

  // 跳转到成绩页面
  window.location.href = 'score.html';
});
