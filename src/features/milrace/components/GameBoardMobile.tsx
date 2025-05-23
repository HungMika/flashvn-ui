'use client';

export default function GameBoardMobile() {
  return (
    <table className="board_m w-full h-full text-xl">
      <tbody>
        <tr>
          <td>
            <div className="cell_m cell-num" id="c28">
              <div>28</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c29">
              <div>29</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-ques" id="c30">
              <div>?</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c31">
              <div>31</div>
            </div>
          </td>
          <td colSpan={2}>
            <div className="cell_m cell-win bg-amber-300" id="c32">
              <div className="flex flex-col items-center">
                <img src="/milrace/img/token/w.png" alt="" className="w-9" />
                <div className="text-xs font-bold">Media Hero</div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="cell_m cell-ques" id="c27">
              <div>?</div>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <div className="cell_m cell-num" id="c26">
              <div>26</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c25">
              <div>25</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-ques" id="c24">
              <div>?</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c23">
              <div>23</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c22">
              <div>22</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-ques" id="c21">
              <div>?</div>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <div className="cell_m cell-num" id="c20">
              <div>20</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="cell_m cell-num" id="c14">
              <div>14</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c15">
              <div>15</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c16">
              <div>16</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c17">
              <div>17</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-ques" id="c18">
              <div>?</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c19">
              <div>19</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="cell_m cell-num" id="c13">
              <div>13</div>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <div className="cell_m cell-ques" id="c12">
              <div>?</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c11">
              <div>11</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c10">
              <div>10</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-ques" id="c9">
              <div>?</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c8">
              <div>8</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c7">
              <div>7</div>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <div className="cell_m cell-ques" id="c6">
              <div>?</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="cell_m cell-start bg-amber-300" id="c0">
              <img src="/milrace/img/common/cell-start.png" alt="" className="rotate-90 w-12 h-12" />
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c1">
              <div>1</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c2">
              <div>2</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-ques" id="c3">
              <div>?</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c4">
              <div>4</div>
            </div>
          </td>
          <td>
            <div className="cell_m cell-num" id="c5">
              <div>5</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
