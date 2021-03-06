import React, { useContext } from "react";
import HarvestContext from "../Context/HarvestContext";
import { Row, Col } from "styled-bootstrap-grid";
import styled from "styled-components";
import { fonts } from "../styles/appStyles";
import Harvest from "../components/harvest/Harvest.jsx";
import TotalFarmEarned from "../components/totalFarmEarned/TotalFarmEarned.jsx";
import Balance from "../components/balance/Balance.jsx";
import APY from "../components/apy/APY.jsx";
import FarmPrice from "../components/farmPrice/FarmPrice";
import AddTokens from "../components/addTokens/AddTokens";
import Wallet from "../components/Wallet";
import FarmCardContainer from "../components/farmCards/FarmCardGroupContainer";

const MainContent = ({ state, setState, openModal, checkBalances,setAddressToCheck }) => {
  const {
    setRadio,
    isCheckingBalance,
    setCheckingBalance,
    disconnect,
  } = useContext(HarvestContext);
 

  const clear = () => {
    setRadio(false);
    setCheckingBalance(false);
    setAddressToCheck("")
    disconnect();
  };
  return (
    <Main>
      {isCheckingBalance ? (
        ""
      ) : (
        <Row>
          <Col>
            <Wallet
              theme={state.theme}
              address={state.address}
              provider={state.provider}
            />
          </Col>
        </Row>
      )}
      <div className="farm-info">
        <Balance state={state} />
        <APY apy={state.apy} display={state.display} theme={state.theme} />
        <FarmPrice
          price={state.farmPrice}
          display={state.display}
          theme={state.theme}
        />
        <TotalFarmEarned />
      </div>
      {isCheckingBalance ? (
        ""
      ) : (
        <Row style={{ marginTop: "15px" }}>
          {/* Git hub pages would not recognize the margin from the bootstrap grid */}
          <Col lg="12">
            <Harvest state={state} setState={setState} openModal={openModal} />
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <FarmCardContainer state={state} setState={setState}/>
        </Col>
      </Row>

      {isCheckingBalance ? (
        ""
      ) : (
        <Row style={{ marginTop: "15px" }}>
          {/* Git hub pages would not recognize the margin from the bootstrap grid */}
          <Col lg="12">
            <AddTokens state={state} />
          </Col>
        </Row>
      )}

      {!isCheckingBalance ? (
        <div className="button-div">
          <button onClick={disconnect} className="clear button">
            Disconnect
          </button>
        </div>
      ) : (
        ""
      )}
      {isCheckingBalance ? (
        <div className="button-div">
          <button onClick={clear} className="clear button">
            Clear
          </button>
        </div>
      ) : (
        ""
      )}
    </Main>
  );
};

export default MainContent;

const Main = styled.div`
  .farm-info {
    display: flex;
  }

  @media (max-width: 1107px) {
    .farm-info {
      display: flex;
      flex-direction: column-reverse;
    }
  }

  .button-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    .button {
      width: max-content;
      margin: 2rem auto 2rem auto;
      font-size: 2rem;
      font-family: ${fonts.headerFont};
      position: relative;
      &:hover {
        top: 1.5px;
      }
    }

    .clear {
      position: relative;
      z-index: 400;
    }
  }
`;
