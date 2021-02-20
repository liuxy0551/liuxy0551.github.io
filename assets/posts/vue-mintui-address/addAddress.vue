<template>
  <div class="m-personal ">
    <div class="m-personal-bg">
      <span class="m-icon-bg"></span>
    </div>
    <div class="m-personal-content m-setUp m-addAddress">
      <div class="m-personal-info">
        <img class="m-personal-head-portrait" :src="user.usheader" alt="">
        <div class="m-personal-info-box">
          <div class="m-personal-info-text">
            <div>
              <p>{{user.usname}}</p>
              <p>
                <span class="m-personal-identity">{{user.usidname}}</span>
              </p>
            </div>

          </div>
        </div>
      </div>
      <div class="m-personal-body">
        <div class="m-one-part">
          <ul class="m-edit-ul m-addAddress-ul">
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label"><span class="m-must">*</span> 收件人</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" v-model="address.uaname">
              </div>
            </li>
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label"><span class="m-must">*</span> 手机号</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" v-model="address.uaphone" maxlength="11">
              </div>
            </li>
            <li class="m-default-address" @click="addressPopup = true">
              <div>
                <span class="m-border"></span>
                <span class="m-label"><span class="m-must">*</span> 省市区</span>
              </div>
              <div>
                <div class="m-address-text">{{addressText}}</div>
                <!--<span class="m-icon-more"></span>-->
              </div>
            </li>
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label"><span class="m-must">*</span> 详细地址</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" v-model="address.uatext">
              </div>
            </li>
            <li>
              <div>
                <span class="m-border"></span>
                <span class="m-label">邮政编码</span>
              </div>
              <div>
                <input type="text" class="m-addAddress-input" v-model="address.uapostalcode" maxlength="6">
              </div>
            </li>
            <li class="m-no-border m-default-address">
              <div>
                <span class="m-border"></span>
                <span>设为默认地址</span>
              </div>
              <div>
                 <span class="m-icon-default" :class="address.uadefault == '1' ? 'active' : ''" @click="defaultAddress"></span>
              </div>
            </li>
          </ul>

          <!--省市区地址三级联动-->
          <mt-popup class="m-address-popup" v-model="addressPopup" position="bottom">
            <div class="m-popup-btn">
              <div @click="addressPopup = false">取消</div>
              <div @click="addressDone">确认</div>
            </div>
            <div class="m-popup-btn">
              <div></div>
              <div>{{myAddressProvince}}-{{myAddressCity}}-{{myAddressArea}}</div>
              <div></div>
            </div>
            <mt-picker :slots="myAddressSlots" value-key="name" :visibleItemCount="7" @change="onMyAddressChange"></mt-picker>
          </mt-popup>

          <div class="m-foot-btn-save">
            <span @click="submitAddress">保存地址</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import common from '../../../common/js/common';
  import axios from 'axios';
  import api from '../../../api/api';
  import { Toast } from 'mint-ui';
  import myaddress from '../../../common/json/pca-code.json'

  export default {
    data() {
      return {
        name: '',
        user: {},
        address: { uadefault: "0" },
        addressText: "请选择省-市-区",
        addressPopup: false,
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: myaddress, //省份数组
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },{
            divider: true,
            content: '-',
            className: 'slot4'
          },{
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        myAddressProvince: '',
        myAddressCity: '',
        myAddressArea: '',
      }
    },
    components: {},
    methods: {
      // 跳转页面
      changeRoute(v) {
        this.$router.push(v)
      },
      // 获取用户信息
      getUser() {
        axios.get(api.get_home + "?token=" + localStorage.getItem('token')).then(res => {
          if(res.data.status == 200){
            this.user = res.data.data;
          }else{
            Toast(res.data.message);
          }
        });
      },
      // 地址三级联动
      onMyAddressChange(picker, values) {
        if(values[0]) {      // 判断values[0]是否有值
          picker.setSlotValues(1, values[0].children);    // 将所点击省份拿到的城市list赋值
          this.myAddressProvince = values[0].name;
          if(values[1]) {      // 判断values[1]是否有值
            picker.setSlotValues(2, values[1].children);  // 将所点击城市拿到的区县list赋值
            this.myAddressCity = values[1].name;
            if(values[2]) {      // 判断values[2]是否有值
              this.myAddressArea = values[2].name;
              this.address.aaid = values[2].code;
            }
          }
        }
      },
      // 省市区三级联动选择后
      addressDone() {
        this.addressText = this.myAddressProvince + "-" + this.myAddressCity + "-" + this.myAddressArea;
        this.addressPopup = false;
      },
      // 设置默认地址
      defaultAddress() {
        if(this.address.uadefault == "0") {
          this.address.uadefault = "1";
        }else if(this.address.uadefault == "1") {
          this.address.uadefault = "0";
        }
      },
      // 保存地址
      submitAddress() {
        if(!this.address.uaname){
          Toast("请先输入收件人姓名");
          return false;
        }else if(!this.address.uaphone){
          Toast("请先输入收件人手机号");
          return false;
        }else if(!this.address.aaid){
          Toast("请先选择省市区");
          return false;
        }else if(!this.address.uatext){
          Toast("请先输入详细地址");
          return false;
        }
        axios.post(api.add_address + '?token=' + localStorage.getItem('token'), this.address).then(res => {
          if(res.data.status == 200){
            Toast("添加成功");
            this.$router.go(-1);
          }else{
            Toast(res.data.message);
          }
        });
      }
    },
    created() {
      common.changeTitle('添加地址');
      this.getUser();         // 获取用户信息

      this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex = 0;
        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
      });
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/css/personal";

  .m-address-popup {
    width: 750px;
    .m-popup-btn {
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      padding: 20px 40px 0 40px;
    }
    .m-popup-row {
      display: flex;
      .m-row-left {

      }
      .m-row-right {

      }
    }
  }
  .m-foot-btn-save {
    span{
      text-align: center;
      display: inline-block;
      width: 610px;
      height: 106px;
      line-height: 106px;
      background-color: @mainColor;
      font-size: 38px;
      font-weight: bold;
      border-radius: 10px;
      box-shadow: 0 5px 6px rgba(0,0,0,0.16);
    }
  }
</style>
