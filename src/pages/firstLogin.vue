<template>
    <div style="margin-top: 12%;">
        <!-- PC -->

        <div class="pt-8 text-center align-center">
            <!--   基本信息   -->
            <v-card-subtitle>
                <h1 >アカウント情報入力</h1>
                 <h4>※登録された名前は後から変更できませんのでご注意ください</h4>
            </v-card-subtitle>
            <v-divider/>
            <van-form @submit="submit" style="padding: 5%">
                <van-field
                        v-if="formData.name == null || formData.name == ''"
                        v-model="formJson.name"
                        name="名前"
                        label="名前"
                        placeholder="姓と名の間にスペースを入力"
                        :rules="[{ required: true, message: '名前を入力してください' }]"
                />
                <van-field
                        v-if="formData.pseudonym == null || formData.pseudonym == ''"
                        v-model="formJson.pseudonym"
                        name="フリガナ"
                        label="フリガナ"
                        placeholder="カタカナで入力"
                        :rules="[{ required: true, message: 'フリガナを入力してください' }]"
                />
                <van-field
                        v-if="formData.email == null || formData.email == ''"
                        v-model="formJson.email"
                        name="邮箱"
                        label="邮箱"
                        placeholder="邮箱"
                        :rules="[{ required: true, message: '请填写邮箱' }]"
                />
                <van-field
                        v-if="formData.mobile == null || formData.mobile == ''"
                        type="tel"
                        v-model="formJson.mobile"
                        name="電話番号"
                        label="電話番号"
                        placeholder="(例:01234567890)"
                        :rules="[{ required: true, message: '電話番号を入力してください' }]" />
                <van-field
                        v-if="formData.password == null || formData.password == ''"
                        v-model="formJson.password"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                        v-if="formData.password == null || formData.password == ''"
                        v-model="formJson.repeatPassword"
                        type="password"
                        name="再次输入密码"
                        label="再次输入密码"
                        placeholder="再次输入密码"
                        :rules="[{ required: true, message: '请再次输入密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button style="font-size:20px;width: 50%;margin: auto" round block type="info" native-type="submit">確定</van-button>
                </div>
            </van-form>
            <!--   我的订单   -->
        </div>
    </div>

</template>

<script>
    import { Notify } from 'vant';
import {signUp} from '@api';
    export default {
        name: "MemberCenter",
        data () {
            return {
                formJson:{},
                formData:{},
                isMobile : false,
                countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', `Timor L'Este`, 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
                errorMessages: '',
                name: null,
                address: null,
                formHasErrors: false,
                username: '',
                password: '',
            }
        },
        computed: {
            form () {
                return {
                    name: this.name,
                    address: this.address,
                }
            },
        },
        watch: {
            name () {
                this.errorMessages = ''
            },
        },
        mounted() {
            this.formData = this.$store.state.signUpMember;
            this.isMobile = this.$store.state.isMobile;
        },
        methods : {
            addressCheck () {
                this.errorMessages = this.address && !this.name
                    ? `Hey! I'm required`
                    : ''

                return true
            },
            resetForm () {
                this.errorMessages = []
                this.formHasErrors = false

                Object.keys(this.form).forEach(f => {
                    this.$refs[f].reset()
                })
            },
            submit () {
                console.log(this.formJson)
                var that = this
                    if(that.formJson.password == that.formJson.repeatPassword){
                        signUp(that.formJson)
                            .then(function (response) {
                                console.log(response)
                                that.$router.push({name:'home'})
                            })
                            .catch(function (error) {
                                Notify({ type: 'warning', message: error.errMessage });
                            });
                    }else{
                        Notify({ type: 'warning', message: '密码不一致' });
                    }

            },

        }
    }
</script>

<style >


</style>
