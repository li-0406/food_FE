import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import api from "../../api"
import "./index.css"

export default function Calculator() {
  const dispatch = useDispatch()
  const [mode, setMode] = useState(0)
  const [weight, setWeight] = useState(1)
  const [activity, setActivity] = useState("low") // low,medium,high
  const [foodId, setFoodId] = useState("")
  const [calculatefoodInfo, setCalculatefoodInfo] = useState(2)
  const [freshList, setFreshList] = useState([])
  const calculateFood = async (params) => {
    // 鮮食計算
    const { data } = await api.post("/freshfoods/calculatefood", params)
    setCalculatefoodInfo(data.data)
  }

  const fetchFreshfoods = async () => {
    // 取的所有食物
    const { data } = await api.get("freshfoods/")
    setFreshList(data.data)
  }

  const submitCalculatefood = () => {
    console.log(weight, activity, foodId)
    calculateFood({ weight, activity, foodId })
  }

  useEffect(() => {
    fetchFreshfoods()
  }, [])
  return (
    <div>
      <div className="flex-wrapper">
        <div className="flex overflow-x-auto">
          <div
            className={`calculator-tab ${mode === 0 ? "calculator-tab-active" : ""}`}
            onClick={() => setMode(0)}
          >
            鮮食隨機配
          </div>
          <div
            className={`calculator-tab ${mode === 1 ? "calculator-tab-active" : ""}`}
            onClick={() => setMode(1)}
          >
            指定鮮食算攝取量
          </div>
          <div
            className={`calculator-tab ${mode === 2 ? "calculator-tab-active" : ""}`}
            onClick={() => setMode(2)}
          >
            指定熱量算鮮食
          </div>
          <div
            className={`calculator-tab ${mode === 3 ? "calculator-tab-active" : ""}`}
            onClick={() => setMode(3)}
          >
            指定飼料算攝取量
          </div>
          <div
            className={`calculator-tab ${mode === 4 ? "calculator-tab-active" : ""}`}
            onClick={() => setMode(4)}
          >
            指定熱量算飼料
          </div>
        </div>
      </div>

      <div className="cus-border">
        <div className="cus-intro">
          不知道該給鸚鵡吃什麼嗎？
          <br />
          輸入鸚鵡體重跟活動水平，我幫你推薦營養均衡的鮮食！
        </div>
        <hr className="cus-line-row" />
        {
          <section className="text-sm cus-block-padding sm:text-base">
            <h2 className="cus-page-title">輸入基本資料</h2>

            <div className="cus-col-3">
              <div className="cus-col-1">
                <label for="weight" className="cus-label">
                  1. 體重 (g) <span className="text-red2">*</span>
                </label>
                <input
                  type="number"
                  className="cus-input"
                  value={weight}
                  placeholder="請輸入鸚鵡體重 (g)"
                  onChange={(e) => setWeight(e.target.value)}
                />
                <span className="cus-input-note">基礎代謝率(BMR) = 175 * (體重 / 1000) ^ 0.75</span>
              </div>

              <div className="cus-col-1">
                <label for="activity" className="cus-label">
                  2. 活動水平 <span className="text-red2">*</span>
                </label>
                <div className="cus-radio-row">
                  <label className="cus-label-radio" for="low">
                    <input
                      type="radio"
                      name="activity"
                      id="low"
                      value="low"
                      checked={activity === "low"}
                      onChange={(e) => setActivity(e.target.value)}
                    />
                    <span></span>低 - 平常不太活動
                  </label>

                  <label className="cus-label-radio" for="medium">
                    <input
                      type="radio"
                      name="activity"
                      id="medium"
                      value="medium"
                      checked={activity === "medium"}
                      onChange={(e) => setActivity(e.target.value)}
                    />
                    <span></span>中 - 適度活動
                  </label>

                  <label for="high" className="cus-label-radio">
                    <input
                      type="radio"
                      name="activity"
                      id="high"
                      value="high"
                      checked={activity === "high"}
                      onChange={(e) => setActivity(e.target.value)}
                    />
                    <span></span>高 - 經常活動
                  </label>
                </div>
                <span className="cus-input-note">活動水平用來調整 BMR，可以更符合需求</span>
              </div>

              {freshList.length && (
                <div className="cus-col-1">
                  <label for="foodId" className="cus-label">
                    3. 選擇想計算的食物 <span className="text-red2">*</span>
                  </label>
                  <select
                    type="number"
                    className="cus-input"
                    id="foodId"
                    value={foodId}
                    onChange={(e) => setFoodId(e.target.value)}
                  >
                    <option value="" disabled selected>
                      請選擇食物
                    </option>
                    {freshList.map((food) => (
                      <option key={food._id} value={food._id}>
                        {food.name}
                      </option>
                    ))}
                  </select>
                  <span className="cus-input-note">目前僅提供計算資料庫內的食物</span>
                </div>
              )}

              <button
                className="mt-5 cus-btn-primary"
                disabled={!weight || !foodId}
                onClick={submitCalculatefood}
              >
                開始計算
              </button>

              {calculatefoodInfo && (
                <div className="">
                  <hr className="cus-line-row" />
                  <div className="">
                    <h2 className="mt-4 cus-page-title">計算結果</h2>

                    {/* 每日基本營養需求 */}
                    <h3 className="cus-title-border-left">每日基本營養需求</h3>
                    <div className="mb-5 cus-table">
                      <div className="grid grid-cols-4 cus-table-row">
                        <div className="cus-table-th">熱量 (kcal/day)</div>
                        <div className="cus-table-th">蛋白質 (g/day)</div>
                        <div className="cus-table-th">脂肪 (g/day)</div>
                        <div className="cus-table-th">碳水化合物 (g/day)</div>
                      </div>
                      <div className="grid grid-cols-4">
                        <div className="cus-table-td">{calculatefoodInfo.dailyCalories}</div>
                        <div className="cus-table-td">{calculatefoodInfo.dailyProteinNeed}</div>
                        <div className="cus-table-td">{calculatefoodInfo.dailyFatNeed}</div>
                        <div className="cus-table-td">{calculatefoodInfo.dailyCarbsNeed}</div>
                      </div>
                    </div>

                    {/* 食物營養資訊 */}
                    <h3 className="cus-title-border-left">食物營養資訊</h3>
                    <div className="mb-5 cus-table">
                      <div className="grid grid-cols-5 cus-table-row">
                        <div className="cus-table-th">食物名稱</div>
                        <div className="cus-table-th">熱量 (kcal/100g)</div>
                        <div className="cus-table-th">蛋白質 (g/100g)</div>
                        <div className="cus-table-th">脂肪 (g/100g)</div>
                        <div className="cus-table-th">碳水化合物 (g/100g)</div>
                      </div>

                      <div className="grid grid-cols-5">
                        <div className="cus-table-td">{calculatefoodInfo.food?.name}</div>
                        <div className="cus-table-td">{calculatefoodInfo.food?.calories}</div>
                        <div className="cus-table-td">{calculatefoodInfo.food?.protein}</div>
                        <div className="cus-table-td">{calculatefoodInfo.food?.fat}</div>
                        <div className="cus-table-td">{calculatefoodInfo.food?.carbs}</div>
                      </div>
                    </div>

                    <div className="mb-5 cus-table">
                      <div className="grid grid-cols-5 cus-table-row">
                        <div className="cus-table-th">每日最大攝取量 (g/day)</div>
                        <div className="cus-table-th">食物備註</div>
                        <div className="col-span-3 cus-table-th">好處</div>
                      </div>
                      <div className="grid grid-cols-5">
                        <div className="cus-table-td">{calculatefoodInfo.food?.maxIntake}</div>
                        <div className="cus-table-td">{calculatefoodInfo.food?.note}</div>
                        <div className="col-span-3 cus-table-td">
                          {calculatefoodInfo.food?.nutrition}
                        </div>
                      </div>
                    </div>

                    {/* 食物建議攝取量 & 營養資訊 */}
                    <h3 className="cus-title-border-left">食物建議攝取量 & 營養資訊</h3>
                    <div className="mb-5 cus-table">
                      <div className="grid grid-cols-5 cus-table-row">
                        <div className="cus-table-th">建議攝取量 (g/day)</div>
                        <div className="cus-table-th">蛋白質量 (g/day)</div>
                        <div className="cus-table-th">脂肪量 (g/day)</div>
                        <div className="cus-table-th">碳水化合物量 (g/day)</div>
                        <div className="cus-table-th">提供總熱量 (kcal/day)</div>
                      </div>

                      <div className="grid grid-cols-5">
                        <div className="cus-table-td">{calculatefoodInfo.foodIntake}</div>
                        <div className="cus-table-td">
                          {calculatefoodInfo.nutrientsProvided?.protein}
                        </div>
                        <div className="cus-table-td">
                          {calculatefoodInfo.nutrientsProvided?.fat}
                        </div>
                        <div className="cus-table-td">
                          {calculatefoodInfo.nutrientsProvided?.carbs}
                        </div>
                        <div className="cus-table-td">{calculatefoodInfo.foodProvidedCalories}</div>
                      </div>
                    </div>

                    {/* 每日所需營養缺失量 */}
                    {calculatefoodInfo.caloriesDifference > 0 ? (
                      <h3
                        className="cus-title-border-left-err"
                        v-if="calculatefoodInfo.caloriesDifference > 0"
                      >
                        每日所需營養缺失量： {calculatefoodInfo.caloriesDifference} (kcal/day)
                      </h3>
                    ) : (
                      <h3 className="cus-title-border-left">補充小知識</h3>
                    )}
                    <div className="text-blue4">
                      每日營養最佳分配比例為：
                      <br />
                      蛋白質 2：脂肪 2：碳水化合物 6，
                      <br />
                      單一種鮮食難以滿足鸚鵡每日所需營養，
                      <br />
                      建議可以使用鮮食隨機配！
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        }
        <hr class="cus-line-row" />
        <div class="cus-intro">
          推薦食物及計算方式皆由 AI 協助蒐集和整理，僅供參考。
          <br />
          若有特殊飲食需求建議尋求專業幫助！
        </div>
      </div>
    </div>
  )
}
