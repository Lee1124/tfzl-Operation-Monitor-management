//处方点评详情
<template>
  <el-dialog
    :title="title"
    custom-class="dialogStyle1 commentDetailsPopup"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
    @open="open"
  >
    <div class="content clearfix">
      <div class="content_left floatLeft">
        <div class="prescription_view">
          <!-- 标题 -->
          <div class="title">
            <h3>言行医至互联网医院</h3>
            <h4>处方笺</h4>
          </div>
          <!-- 标志 -->
          <div class="sign">
            普通药
            <br />品处方
          </div>
          <!-- 基本信息 -->
          <div class="base _view">
            <table border="0" cellspacing="0" cellpadding="0" style="width:100%;">
              <tr>
                <td class="col1">
                  NO：
                  <span class="value">p11145436547548658</span>
                </td>
                <td class="col2"></td>
                <td class="col3">
                  开方日期：
                  <span class="value">2019-09-23 13:09:12</span>
                </td>
              </tr>
              <tr>
                <td class="col1">
                  姓名：
                  <span class="value">小李子</span>
                </td>
                <td class="col2">
                  性别：
                  <span class="value">男</span>
                </td>
                <td class="col3">
                  年龄：
                  <span class="value">100</span>
                </td>
              </tr>
              <tr>
                <td class="col1">
                  门诊（住院）病历号：
                  <span class="value">M12434325</span>
                </td>
                <td class="col2"></td>
                <td class="col3">
                  科室：
                  <span class="value">内科</span>
                </td>
              </tr>
              <tr>
                <td class="col1">
                  电话：
                  <span class="value">13409876528</span>
                </td>
                <td class="col2">
                  费别：
                  <span class="value">自费</span>
                </td>
              </tr>
              <tr>
                <td class="col1">
                  地址：
                  <span class="value">高新区益州大道中段1923号</span>
                </td>
              </tr>
              <tr>
                <td class="col1">
                  临床（初步诊断）：
                  <span class="value">急性上呼吸道感染</span>
                </td>
              </tr>
            </table>
          </div>
          <!-- 开方药 -->
          <div class="drug _view">
            <p class="title">Rp</p>
            <ul>
              <template v-for="(item,index) in drugList">
                <li :key="index">
                  <div class="name">
                    {{index+1}}、{{item.name}}
                    <span class="norms">{{item.norms}}</span>
                  </div>
                  <div class="use">
                    用法：{{item.use}}
                    <span class="count floatRight">{{item.count}}</span>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <!-- footer落款 -->
          <div class="footNews">
            <div class="top">
              <span class="doctor">医师：李四光</span>
              <span class="rightPerson floatRight">审核：李四光儿子</span>
            </div>
            <div class="bt clearfix">
              <span class="rightPerson floatRight">核对：李四光、李四光</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content_right floatRight">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="药品品种:">
            <el-input type="number" v-model="form.varieties" :disabled="type===2"></el-input>
          </el-form-item>
          <el-form-item label="抗菌药:">
            <el-input type="number" @input="antibacterials" v-model="form.antibacterials" :disabled="type===2"></el-input>
          </el-form-item>
          <el-form-item label="注射剂:">
            <el-input type="number" @input="injection" v-model="form.injection" :disabled="type===2"></el-input>
          </el-form-item>
          <el-form-item label="国基药物品种数:">
            <el-input type="number" v-model="form.varieties2" :disabled="type===2"></el-input>
          </el-form-item>
          <el-form-item label="药品通用名数:">
            <el-input type="number" v-model="form.common" :disabled="type===2"></el-input>
          </el-form-item>
          <el-form-item label="药品金额:">
            <el-input v-model="form.price" :disabled="type===2"></el-input>
          </el-form-item>
          <el-form-item label="是否合理:">
            <el-radio-group v-model="form.reasonable">
              <el-radio label="合理" :disabled="type===2"></el-radio>
              <el-radio label="不合理" :disabled="type===2"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="存在问题:" v-if="form.reasonable==='不合理'">
            <div class="problem scrollbarStyle">
              <p class="problem_title">不规范处方</p>
              <el-checkbox-group v-model="form.type">
                <template v-for="(item,index) in problem1">
                  <el-checkbox :label="item.name" :key="index" name="type" :disabled="type===2"></el-checkbox>
                </template>
              </el-checkbox-group>
              <p class="problem_title">用药不适宜处方</p>
              <el-checkbox-group v-model="form.type">
                <template v-for="(item,index) in problem2">
                  <el-checkbox :label="item.name" :key="index" name="type" :disabled="type===2"></el-checkbox>
                </template>
              </el-checkbox-group>
              <p class="problem_title">超常处方</p>
              <el-checkbox-group v-model="form.type">
                <template v-for="(item,index) in problem3">
                  <el-checkbox :label="item.name" :key="index" name="type" :disabled="type===2"></el-checkbox>
                </template>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <div class="footer" v-if="type===1">
            <el-button size="medium">《上一张</el-button>
            <el-button size="medium" type="primary">保存并点评下一张(100/200)</el-button>
            <el-button size="medium">下一张》</el-button>
            <el-button size="medium" @click.stop="clear">清空</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>
<script>
// import { openPrint, deepClone, getY_M_D_H_M_S, findName } from "@/utils/index";
import store from "@/store";
export default {
  props:{
    
  },
  data() {
    return {
      show: false,
      type:1,//1-处方点评  2-处方点评详情
      title:'处方点评',
      drugList: [
        {
          name: "头孢克肟分散片",
          norms: "0.5g*30片",
          use: "1.0片/次，口服给药，一日3次",
          count: "1盒"
        },
        {
          name: "头孢克肟分散片",
          norms: "0.5g*30片",
          use: "1.0片/次，口服给药，一日3次",
          count: "1盒"
        }
      ],
      form: {
        varieties: 0, //药品品种(后自动输入)
        antibacterials: 0, //抗菌药
        injection: 0, //注射剂
        varieties2: 0, //国基药物品种数
        common: 0, //药品通用名数
        price: "", //药品金额
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        reasonable: "合理",
        desc: ""
      },
      problem1: [
        {
          name: "1-1处方的前记、正文、后记内容缺项，书写不规范或者字迹难以辨认"
        },
        { name: "1-2医师签名、签章不规范或者与签名、签章的留样不一致" },
        {
          name:
            "1-3药师未对处方进行适宜性审核的（处方后记的审核、调配、核对、发药栏目无审核调配药师及核对发药药师签名，或者单人值班调剂未执行双签名规定）"
        },
        { name: "1-4新生儿、婴幼儿处方未写明日、月龄" },
        { name: "1-5西药、中成药与中药饮片未分别开具处方" },
        { name: "1-6未使用药品规范名称开具处方" },
        { name: "1-7药品的剂量、规格、数量、单位等书写不规范或不清楚" },
        { name: "1-8用法、用量使用“遵医嘱”、“自用”等含糊不清字句" },
        {
          name:
            "1-9处方修改未签名并注明修改日期，或药品超剂量使用未注明原因和再次签名"
        },
        { name: "1-10开具处方未写临床诊断或临床诊断书写不全" },
        { name: "1-11单张门急诊处方超过五种药品" },
        {
          name:
            "1-12无特殊情况下，门诊处方超过7日用量，急诊处方超过3日用量，慢性病、老年病或特殊情况下需要适当延长处方用量未注明理由"
        },
        {
          name:
            "1-13开具麻醉药品、精神药品、医疗用毒性药品、放射性药品等特殊管理药品处方未执行国家有关规定"
        },
        { name: "1-14医师未按照抗菌药物临床应用管理规定开具抗菌药物处方" },
        {
          name:
            "1-15中药饮片处方药物未按照“君、臣、佐、使”的顺序排列,或未按要求标注药物调剂、煎煮等特殊要求"
        }
      ],
      problem2: [
        { name: "2-1适应证不适宜" },
        { name: "2-2遴选的药品不适宜" },
        { name: "2-3药品剂型或给药途径不适宜" },
        { name: "2-4无正当理由不首选国家基本药物" },
        { name: "2-5用法、用量不适宜" },
        { name: "2-6联合用药不适宜" },
        { name: "2-7重复给药" },
        { name: "2-8有配伍禁忌或者不良相互作用" },
        { name: "2-9其它用药不适宜情况" }
      ],
      problem3: [
        { name: "3-1无适应证用药" },
        { name: "3-2无正当理由开具高价药" },
        { name: "3-3无正当理由超说明书用药" },
        { name: "3-4无正当理由为同一患者同时开具2种以上药理作用相同药物" }
      ]
    };
  },
  methods: {
    open() {},
    antibacterials(val) {
      // this.form.antibacterials = parseInt(val) > 0 ? 1 : 0;
    },
    injection(val) {
      // this.form.injection = parseInt(val) > 0 ? 1 : 0;
    },
    //清空
    clear() {
      let clearArr = [
        "varieties",
        "antibacterials",
        "injection",
        "varieties2",
        "common",
        "price"
      ];
      clearArr.forEach(item => {
        this.form[item] = "";
      });
    }
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        this.form.antibacterials = this.form.antibacterials > 0 ? 1 : 0;
        this.form.injection = this.form.injection > 0 ? 1 : 0;
        // this.form.varieties2 =
        //   this.form.varieties2 === "" ? 0 : this.form.varieties2;
        // this.form.common = this.form.common === "" ? 0 : this.form.common;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
@import "~@/assets/styles/table.scss";

/deep/ .commentDetailsPopup {
  width: 84%;
  .el-dialog__body {
    padding: 0;
  }
  .content_left {
    width: 55%;
    border-right: 1px solid #e0e0e0;
    box-sizing: border-box;
    padding: 20px 30px 20px 20px;
    .prescription_view {
      box-sizing: border-box;
      border: 1px solid #999;
      border-radius: 4px;
      box-shadow: 2px 2px 8px 0px rgba(51, 51, 51, 0.2);
      padding: 20px 20px 10px;
      position: relative;
      ._view {
        border-bottom: 1px solid #999;
        padding: 20px 0;
      }
      .title {
        h3 {
          color: #333;
          font-size: 16px;
        }
        h4 {
          font-weight: 400;
          margin: 20px 0;
        }
        h3,
        h4 {
          text-align: center;
        }
      }
      .sign {
        position: absolute;
        padding: 10px 20px;
        border: 1px solid #999;
        font-size: 12px;
        right: 60px;
        top: 26px;
      }
      .base {
        tr td {
          color: #666;
          font-size: 14px;
          height: 30px;
          overflow: hidden;
          span.value {
            text-decoration: underline;
          }
        }
        .col1 {
          width: 40%;
        }
        .col2 {
          width: 20%;
        }
        .col3 {
          width: 30%;
        }
      }
      .drug {
        .title {
          color: #333;
          font-weight: 700;
        }
        ul li {
          font-size: 14px;
          color: #666;
          margin-bottom: 30px;
        }
        ul li:last-child {
          margin-bottom: 0;
        }
        ul li .name {
          color: #000;
          margin: 10px 0;
          .norms {
            color: #666;
            margin-left: 50px;
          }
        }
        ul li .use {
          margin-left: 20px;
        }
      }
      .footNews {
        padding: 20px 0;
        span {
          font-size: 14px;
          color: #000;
        }
        .top {
          margin-bottom: 12px;
        }
        .rightPerson {
          display: inline-block;
          width: 160px;
        }
      }
    }
  }
  .content_right {
    width: 45%;
    padding: 20px 40px 20px 10px;
    box-sizing: border-box;
    .el-form-item {
      margin-bottom: 2px;
      .el-form-item__label {
        font-size: 14px;
        width: 120px !important;
      }
      .el-form-item__content {
        margin-left: 120px !important;
      }
      .el-checkbox__label {
        white-space: pre-wrap;
        vertical-align: middle;
      }
      .el-checkbox:last-of-type {
        margin-right: 20px;
      }
    }
    .el-input__inner {
      height: 30px;
      line-height: 30px;
    }
    .problem {
      max-height: 260px;
      overflow-y: auto;
      .problem_title {
        color: #666;
        font-weight: 700;
      }
    }
    .footer {
      text-align: center;
      margin-top: 46px;
      margin-right: -15px;
    }
  }
}
</style>