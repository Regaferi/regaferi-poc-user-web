<template>
    <div style="margin-top: 12%;">
        <!-- PC -->
        <v-card v-show="!isMobile">
            <v-card-title>补全信息</v-card-title>
            <v-card-text>
                <v-tabs vertical>
                    <v-tab>
                        <v-icon left>
                            mdi-account
                        </v-icon>
                        {{$t('i18n.account.basic.title')}}
                    </v-tab>
                    <v-tab>
                        <v-icon left>
                            mdi-lock
                        </v-icon>
                        我的订单
                    </v-tab>
                    <v-tab-item>
                        <v-card
                                class="mx-auto"
                                max-width="344"
                                height="350"
                                flat
                        >
                            <!--   头像   -->
                            <div class="pt-5 pb-5">
                                <v-avatar><v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"/></v-avatar>
                            </div>
                            <!--   基本信息   -->
                            <h3>顾客昵称</h3>
                            <p class="pt-2">28319SJX929318282ZA</p>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card max-width="344" height="350" class="mx-auto overflow-y-auto" flat>
                            <v-list>
                                <v-row>
                                    <v-col cols="12">
                                        <v-card outlined>
                                            <v-card-text>
                                                <p>会员卡 A</p>
                                                <p>2021.01.01-2021.06.30</p>
                                                <p>限定期限使用</p>
                                                <p>使用详情</p>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-card outlined>
                                            <v-card-text>
                                                <p>会员卡 A</p>
                                                <p>2021.01.01-2021.06.30</p>
                                                <p>限定期限使用</p>
                                                <p>使用详情</p>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-card outlined>
                                            <v-card-text>
                                                <p>会员卡 A</p>
                                                <p>2021.01.01-2021.06.30</p>
                                                <p>限定期限使用</p>
                                                <p>使用详情</p>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-list>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
        </v-card>
        <div v-show="isMobile" class="pt-8 text-center align-center">
            <!--   头像   -->
            <v-avatar><v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"/></v-avatar>
            <!--   基本信息   -->
            <v-card-subtitle>
                <h3>信息补全</h3>
                <p class="pt-2">28319SJX929318282ZA</p>
            </v-card-subtitle>
            <v-divider/>
            <v-row justify="center">
                <v-col
                        cols="12"
                        sm="10"
                        md="8"
                        lg="6"
                >
                    <v-card ref="form">
                        <v-card-text>
                            <v-text-field
                                    ref="name"
                                    v-model="name"
                                    :rules="[() => !!name || 'This field is required']"
                                    :error-messages="errorMessages"
                                    label="名字"
                                    placeholder="John Doe"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    ref="address"
                                    v-model="address"
                                    :rules="[
              () => !!address || 'This field is required',
              () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
              addressCheck
            ]"
                                    label="电话"
                                    placeholder="Snowy Rock Pl"
                                    counter="11"
                                    required
                            ></v-text-field>
                        </v-card-text>
                        <v-divider class="mt-12"></v-divider>
                        <v-card-actions>
                            <!--<v-btn text>
                                取消
                            </v-btn>
                            <v-spacer></v-spacer>-->
                            <v-slide-x-reverse-transition>
                                <v-tooltip
                                        v-if="formHasErrors"
                                        left
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                                icon
                                                class="my-0"
                                                v-bind="attrs"
                                                @click="resetForm"
                                                v-on="on"
                                        >
                                            <v-icon>mdi-refresh</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Refresh form</span>
                                </v-tooltip>
                            </v-slide-x-reverse-transition>
                            <v-btn
                                    color="primary"
                                    text
                                    @click="submit"
                            >
                                提交
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <!--   我的订单   -->
        </div>
    </div>

</template>

<script>
import {signUp} from '@api';
    export default {
        name: "MemberCenter",
        data () {
            return {
                isMobile : false,
                countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', `Timor L'Este`, 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
                errorMessages: '',
                name: null,
                address: null,
                formHasErrors: false,
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
                var that = this
                that.formHasErrors = false

                Object.keys(that.form).forEach(f => {
                    if (!that.form[f]) that.formHasErrors = true

                    that.$refs[f].validate(true)
                })
                signUp({
                    "mobile": that.address,
                    "name": that.name,
                })
                    .then(function (response) {
                        console.log(response)
                        that.$router.push({name:'home'})
                    })
                    .catch(function (error) {
                        that.$notify({ type: 'warning', message: error.errMessage });
                    });
            },

        }
    }
</script>

<style scoped>

</style>
