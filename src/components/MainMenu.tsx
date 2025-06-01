import { useNavigate } from "react-router-dom";
import "../index.css";
const basePath = import.meta.env.BASE_URL;

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="container main-menu">
      <h1>
        お金の管理アプリ
        <br />
        メインメニュー
      </h1>

      <div className="card" id="childBtn" onClick={() => navigate("/child")}>
        <img
          src={`${basePath}child.png`}
          alt="貯金管理アプリのアイコン（こども）"
          className="card-img"
        />
        <div className="card-text">
          <h2 className="app-title">貯金管理アプリ</h2>
          <p className="app-desc">目標額に向けた貯金を管理</p>
        </div>
      </div>

      <div
        className="card"
        id="grandpaBtn"
        onClick={() => navigate("/grandpa")}
      >
        <img
          src={`${basePath}grandpa.png`}
          alt="資産管理アプリのアイコン（おじいちゃん）"
          className="card-img"
        />
        <div className="card-text">
          <h2 className="app-title">資産管理アプリ</h2>
          <p className="app-desc">総資産や運用状況を確認</p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;