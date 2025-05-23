import { useEffect, useState } from 'react';
import ScoreBoard from './ScoreBoard';

export default function GamePC({
  playersArr,
  currentPlayerIndex,
  rolling,
  questionSetTitle,
  onPopupHowtoplay,
  rollDice,
}) {
  return (
    <div className="bg-[#bbdff6] w-full h-full ">
      <button
        onClick={() => onPopupHowtoplay()}
        className="fixed top-2 right-2 border-2 border-black w-8 h-8 rounded-full lg:w-9 lg:h-9 lg:text-xl"
      >
        ?
      </button>
      <span className="fixed bottom-1 right-2 tracking-tighter">Bộ câu hỏi: {questionSetTitle}</span>
      <div className="min-h-screen min-w-screen flex flex-row">
        <div className="board_pc w-[77%] h-screen p-3 box-border">
          <table className="w-full h-full md:text-2xl lg:text-4xl">
            <tbody>
              <tr>
                <td>
                  <div className="cell_pc cell-num" id="c5">
                    <div>5</div>
                  </div>
                </td>
                <td>
                  <div className="cell_pc cell-ques" id="c6">
                    <div>?</div>
                  </div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c7">
                    <div>7</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c19">
                    <div>19</div>
                  </div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c20">
                    <div>20</div>
                  </div>
                </td>
                <td>
                  <div className="cell_pc cell-ques" id="c21">
                    <div>?</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td rowSpan="2">
                  <div className="cell_pc cell-win bg-amber-300" id="c32">
                    <div className="flex flex-col items-center">
                      <img src="/milrace/img/token/w.png" alt="" className="w-14" />
                      <div className="text-2xl font-bold text-center mt-2 lg:text-3xl">Media Hero</div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="b-mt">
                  <div className="cell_pc cell-num" id="c4">
                    <div>4</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c8">
                    <div>8</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-ques" id="c18">
                    <div>?</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c22">
                    <div>22</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="cell_pc cell-ques" id="c3">
                    <div>?</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-ques" id="c9">
                    <div>?</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c17">
                    <div>17</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c23">
                    <div>23</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c31">
                    <div>31</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="cell_pc cell-num" id="c2">
                    <div>2</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c10">
                    <div>10</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c16">
                    <div>16</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-ques" id="c24">
                    <div>?</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-ques" id="c30">
                    <div>?</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="cell_pc cell-num" id="c1">
                    <div>1</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c11">
                    <div>11</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-ques" id="c15">
                    <div>?</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c25">
                    <div>25</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c29">
                    <div>29</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="cell_pc cell-start bg-amber-300" id="c0">
                    <img src="/milrace/img/common/cell-start.png" alt="" className="w-20 h-20" />
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-ques" id="c12">
                    <div>?</div>
                  </div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c13">
                    <div>13</div>
                  </div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c14">
                    <div>14</div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c26">
                    <div>26</div>
                  </div>
                </td>
                <td>
                  <div className="cell_pc cell-ques" id="c27">
                    <div>?</div>
                  </div>
                </td>
                <td>
                  <div className="cell_pc cell-num" id="c28">
                    <div>28</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-[23%] h-screen overflow-auto">
          <ScoreBoard
            rolling={rolling}
            playersArr={playersArr}
            currentPlayerIndex={currentPlayerIndex}
            rollDice={rollDice}
          />
        </div>
      </div>
    </div>
  );
}
