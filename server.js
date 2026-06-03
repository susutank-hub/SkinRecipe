const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* MySQL 연결 */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "skin_recipe"
});

db.connect((err) => {
  if (err) {
    console.log("DB 연결 실패:", err);
  } else {
    console.log("MySQL 연결 성공 😎");
  }
});

/* 회원가입 API */
app.post("/signup", (req, res) => {

  const { username, email, password, skin_type } = req.body;

  const sql =
    "INSERT INTO users (username, email, password, skin_type) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [username, email, password, skin_type],
    (err, result) => {

      if (err) {

        console.log(err);

        res.json({
          success: false,
          message: "회원가입 실패 😥"
        });

      } else {

        res.json({
          success: true,
          message: "회원가입 성공 😎"
        });

      }
    }
  );
});

/* 로그인 API */
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {

    console.log(result);

    if (err) {
      console.log(err);
      res.send("로그인 실패");
    } else {

      if (result.length > 0) {

        res.json({
          success: true,
          username: result[0].username
        });

      } else {

        res.json({
          success: false
        });
      }
    }
  });
});

app.get("/search", (req, res) => {

  const keyword = req.query.keyword;

  const sql = `
    SELECT *
    FROM recommendation_products
    WHERE product_name LIKE ?
  `;

  db.query(
    sql,
    [`%${keyword}%`],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.json({
          success: false
        });
      }

      res.json({
        success: true,
        data: result
      });

    }
  );

});

/* 추천 제품 조회 API */
app.get("/recommendations", (req, res) => {

  const skinType = req.query.skin;
  const concernNo = req.query.concern;

  const sql = `
    SELECT *
    FROM recommendation_products
    WHERE skin_type = ?
    AND concern_no = ?
    LIMIT 6
  `;

  db.query(
    sql,
    [skinType, concernNo],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.json({
          success: false,
          message: "조회 실패"
        });
      }

      res.json({
        success: true,
        data: result
      });

    }
  );

});

console.log("recommendations API 등록됨");

app.get("/", (req, res) => {
  console.log("홈 호출됨");
  res.send("홈 테스트 성공");
});

app.get("/test", (req,res)=>{
  res.send("테스트 성공");
});

/* 서버 실행 */
app.listen(3000, () => {
  console.log("서버 실행중 😎");
});