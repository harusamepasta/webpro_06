const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  if (hand === cpu) {
  judgement = '引き分け';
  } else if (
  (hand === 'グー' && cpu === 'チョキ') ||
  (hand === 'チョキ' && cpu === 'パー') ||
  (hand === 'パー' && cpu === 'グー')
  ) {
  judgement = '勝ち';
  win += 1; // 勝った場合のみ win カウントを増やす
  } else {
  judgement = '負け';
  }
  total += 1; // 試合回数を増やす
  // 今はダミーで人間の勝ちにしておく
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/ryouri", (req, res) => {
  const ingredient = req.query.ingredient; // ユーザーが入力した食材

  const dishes = {
    トマト: ['トマトパスタ', 'カプレーゼ', 'ミネストローネ'],
    じゃがいも: ['ポテトサラダ', 'フライドポテト', 'じゃがバター'],
    鶏肉: ['チキンカレー', '照り焼きチキン', '唐揚げ'],
    卵: ['スクランブルエッグ', '卵かけご飯', '親子丼'],
    チーズ: ['ピザ', 'グラタン', 'ダブルチーズバーガー']
  };

  // 提案料理をランダムに選ぶ
  let suggestion = '';
  if (dishes[ingredient]) {
    suggestion = dishes[ingredient][Math.floor(Math.random() * dishes[ingredient].length)];
  } else {
    suggestion = '新しい料理を発明しましょう！';
  }

  const display = {
    ingredient: ingredient,
    suggestion: suggestion
  };

  console.log(display);
  res.render('ryouri', display);
});

app.get("/seikaku", (req, res) => {
  const input = req.query.word; // ユーザーが入力した言葉
  const seikakuMap = {
    青: '冷静で知的な性格です！',
    赤: '情熱的でエネルギッシュな性格です！',
    緑: '穏やかで協調性のある性格です！',
    黄: '自由で冒険心にあふれています！',
    白: '夢を追いかけるロマンチストです！',
    黒: '自分の殻にこもりがちな性格です！'
  };

  let result = seikakuMap[input] || '個性的でユニークな性格ですね！';

  const display = {
    input: input,
    result: result
  };

  console.log(display);
  res.render('seikaku', display);
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
