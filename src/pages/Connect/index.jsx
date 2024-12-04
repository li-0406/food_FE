import React, { useState } from "react"
import api from "../../api"
import { MailOutlined } from "@ant-design/icons"

export default function Connect() {
  const [data, setData] = useState({
    contactPerson: "",
    phone: "",
    email: "",
    feedback: "",
    source: ""
  })
  const sourceOption = ["網路搜尋", "社群媒體", "親友介紹", "其他"]

  const createFeedback = async (params) => {
    // 填寫回饋
    if (!params.source) delete params.source

    const { data } = await api.post("/feedbacks", params)
    console.log(data)
  }

  const sendContact = () => {
    console.log(data)
  }
  return (
    <div class="w-full">
      <div class="cus-border">
        <div class="cus-intro">
          使用上遇到困難？希望有更好用的功能？覺得網站很實用？
          <br />
          把想法都告訴我們吧，我們可以把你的想法化為現實。
          <br />
          非常歡迎擁有專業知識的夥伴加入我們的 side project ✨
        </div>
        <hr class="cus-line-row" />
        <div class="cus-block-padding">
          <h2 class="cus-page-title">填寫表單幫助我們變得更好</h2>
          <div class="cus-col-3">
            <div class="cus-col-1">
              <label for="contactPerson" class="cus-label">
                名稱 <span class="text-red2">*</span>
              </label>
              <input
                type="text"
                class="cus-input"
                id="contactPerson"
                v-model="contactPerson"
                placeholder="請輸入名稱"
              />
            </div>

            <div class="cus-col-1">
              <label for="phone" class="cus-label">
                電話 <span class="text-red2">*</span>
              </label>
              <input
                type="tel"
                class="cus-input"
                id="phone"
                v-model="phone"
                placeholder="請輸入電話"
              />
            </div>

            <div class="cus-col-1">
              <label for="email" class="cus-label">
                信箱 <span class="text-red2">*</span>
              </label>
              <input
                type="email"
                class="cus-input"
                id="email"
                v-model="email"
                placeholder="請輸入信箱"
              />
            </div>

            <div class="cus-col-1">
              <label for="feedback" class="cus-label">
                內容 <span class="text-red2">*</span>
              </label>
              <input
                type="text"
                class="cus-input"
                id="feedback"
                v-model="feedback"
                placeholder="請輸入內容"
              />
            </div>

            <div class="cus-col-1">
              <label for="source" class="cus-label">
                從哪裡得知此網站
              </label>
              <div class="cus-radio-row">
                <label class="cus-label-radio" for="網路搜尋">
                  <input
                    type="radio"
                    name="source"
                    class=""
                    id="網路搜尋"
                    v-model="source"
                    value="網路搜尋"
                  />
                  <span></span>
                  網路搜尋
                </label>

                <label class="cus-label-radio" for="社群媒體">
                  <input
                    type="radio"
                    name="source"
                    class=""
                    id="社群媒體"
                    v-model="source"
                    value="社群媒體"
                  />
                  <span></span>
                  社群媒體
                </label>

                <label for="親友介紹" class="cus-label-radio">
                  <input
                    type="radio"
                    name="source"
                    class=""
                    id="親友介紹"
                    v-model="source"
                    value="親友介紹"
                  />
                  <span></span>親友介紹
                </label>

                <label for="其他" class="cus-label-radio">
                  <input
                    type="radio"
                    name="source"
                    class=""
                    id="其他"
                    v-model="source"
                    value="其他"
                  />
                  <span></span>其他
                </label>
              </div>
            </div>
          </div>
          <button
            class="cus-btn-primary mt-5"
            disabled={!data.contactPerson || !data.phone || !data.email || !data.feedback}
            onClick={sendContact}
          >
            送出表單
          </button>
        </div>

        <hr class="cus-line-row" />

        <div class="cus-block-padding">
          <h2 class="cus-page-title">或是你也可以用其他方式聯繫我們</h2>
          <a
            href="mailto:cr870406@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex transform items-center gap-2 text-blue4 duration-300 hover:text-blue3"
          >
            <MailOutlined />
            <p>cr870406@gmail.com</p>
          </a>
        </div>
      </div>
    </div>
  )
}
