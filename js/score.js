// score.js - 成绩页面渲染与交互逻辑

// 页面加载时从 sessionStorage 读取数据并渲染
window.addEventListener('DOMContentLoaded', function() {
  // 从 sessionStorage 获取数据
  const subject = sessionStorage.getItem('subject');
  const uname = sessionStorage.getItem('uname');
  const idCard = sessionStorage.getItem('idCard');
  const school = sessionStorage.getItem('school');
  const scoreReport = sessionStorage.getItem('scoreReport');
  const writtenExamNum = sessionStorage.getItem('writtenExamNum');
  const writtenTotal = sessionStorage.getItem('writtenTotal');
  const writtenListening = sessionStorage.getItem('writtenListening');
  const writtenReading = sessionStorage.getItem('writtenReading');
  const writtenWriting = sessionStorage.getItem('writtenWriting');
  const oralExamNum = sessionStorage.getItem('oralExamNum');
  const oralLevel = sessionStorage.getItem('oralLevel');
  const noticeTime = sessionStorage.getItem('noticeTime');

  // 如果没有数据，跳转回首页
  if (!subject) {
    window.location.href = 'index.html';
    return;
  }

  // 渲染考试科目到 exam-type 标签
  const examTypeEl = document.querySelector('.exam-type');
  if (examTypeEl) {
    examTypeEl.textContent = subject;
  }

  // 渲染考生信息（姓名和身份证号脱敏处理）
  const nameValueEl = document.querySelector('.score-user-name-value');
  if (nameValueEl) {
    // 姓名脱敏：第1个字保留，从第2个字开始用 * 代替
    const maskedName = uname.charAt(0) + '*'.repeat(uname.length - 1);
    nameValueEl.textContent = maskedName;
  }

  const idCardValueEl = document.querySelector('.score-id-card-value');
  if (idCardValueEl) {
    // 身份证号脱敏：前2位和后3位保留，中间13位用 * 代替
    const maskedIdCard = idCard.substring(0, 2) + '*'.repeat(13) + idCard.substring(idCard.length - 3);
    idCardValueEl.textContent = maskedIdCard;
  }

  const schoolValueEl = document.querySelector('.score-school-name-value');
  if (schoolValueEl) {
    schoolValueEl.textContent = school;
  }

  // 渲染笔试成绩
  const writtenExamNumEl = document.querySelector('.written-exam-num-value');
  if (writtenExamNumEl) {
    writtenExamNumEl.textContent = writtenExamNum;
  }

  const writtenTotalEl = document.querySelector('.score-total-value');
  if (writtenTotalEl) {
    writtenTotalEl.textContent = writtenTotal;
  }

  const writtenListeningEl = document.querySelector('.score-listening-value');
  if (writtenListeningEl) {
    writtenListeningEl.textContent = writtenListening;
  }

  const writtenReadingEl = document.querySelector('.score-reading-value');
  if (writtenReadingEl) {
    writtenReadingEl.textContent = writtenReading;
  }

  const writtenWritingEl = document.querySelector('.score-writing-value');
  if (writtenWritingEl) {
    writtenWritingEl.textContent = writtenWriting;
  }

  // 渲染口试成绩
  const oralExamNumEl = document.querySelector('.oral-exam-num-value');
  if (oralExamNumEl) {
    oralExamNumEl.textContent = oralExamNum;
  }

  const oralLevelEl = document.querySelector('.oral-level-value');
  if (oralLevelEl) {
    oralLevelEl.textContent = oralLevel;
  }

  // 渲染通知时间
  const noticeTimeEl = document.querySelector('.notice-time');
  if (noticeTimeEl) {
    noticeTimeEl.textContent = noticeTime;
  }

  // 根据 scoreReport 值控制显示/隐藏
  // scoreReport 不为 0 时：将值渲染到 score-score-report-value，隐藏"不"字（is-score-report）
  // scoreReport 为 0 时：隐藏成绩报告单编号所在 li，移除"不"字的 display 属性使其正常显示
  const scoreReportNum = Number(scoreReport);
  const scoreReportValueEl = document.querySelector('.score-score-report-value');
  const isScoreReportEl = document.querySelector('.is-score-report');

  if (scoreReportNum === 0) {
    // scoreReport 为 0：隐藏成绩报告单编号所在 li，移除"不"字的 display 属性
    if (scoreReportValueEl) {
      scoreReportValueEl.closest('li').style.display = 'none';
    }
    if (isScoreReportEl) {
      // 移除 display 属性，让"不"字正常显示
      isScoreReportEl.style.removeProperty('display');
    }
  } else {
    // scoreReport 不为 0：将值渲染到 score-score-report-value 标签，隐藏"不"字
    if (scoreReportValueEl) {
      scoreReportValueEl.textContent = scoreReport;
    }
    if (isScoreReportEl) {
      isScoreReportEl.style.display = 'none';
    }
  }
});

// 返回按钮点击事件
const btnBack = document.querySelector('.btn-back');
if (btnBack) {
  btnBack.addEventListener('click', function() {
    window.location.href = 'index.html';
  });
}
