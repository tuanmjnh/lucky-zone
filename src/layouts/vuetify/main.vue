<template>
  <div>
    <!--temporary-->
    <v-navigation-drawer :mini-variant="miniVariant" :clipped="clipped" v-model="drawer"
      enable-resize-watcher fixed app>
      <v-toolbar flat>
        <v-list>
          <v-list-tile @click="$router.push(navHeadLeft.push)">
            <v-list-tile-action>
              <v-icon>{{navHeadLeft.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content class="title">
              <v-list-tile-title>{{navHeadLeft.title}}</v-list-tile-title>
            </v-list-tile-content>
            <!-- <v-list-tile-title class="title">
              TM Store
            </v-list-tile-title> -->
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list>
        <template v-for="(item, i) in navContentLeft">
          <v-list-tile v-if="!item.children||item.children.length<1" :key="i" @click="MenuAction(item)">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-group v-else :key="i" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-action>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <template v-for="(children, ii) in item.children">
              <v-list-tile :key="ii" v-if="!children.children||children.children.length<1"
                @click="MenuAction(children)">
                <v-list-tile-title v-text="children.title" />
                <v-list-tile-action>
                  <v-icon>{{children.icon}}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-group v-else :key="ii" no-action sub-group>
                <v-list-tile slot="activator">
                  <v-list-tile-title v-text="children.title" />
                  <v-list-tile-action>
                    <v-icon>{{children.icon}}</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <template v-for="(child, iii) in children.children">
                  <v-list-tile :key="iii" @click="MenuAction(child)">
                    <v-list-tile-title v-text="child.title" />
                    <v-list-tile-action>
                      <v-icon>{{child.icon}}</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list-group>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon v-if="clipped" @click.stop="drawer=!drawer"></v-toolbar-side-icon>
      <v-btn v-if="!clipped" icon @click.stop="miniVariant=!miniVariant">
        <v-icon v-html="miniVariant?'chevron_right':'chevron_left'"></v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn> -->
      <!-- <v-toolbar-title v-text="title"></v-toolbar-title> -->
      <v-spacer></v-spacer>
      <!-- <v-btn icon @click.stop="ShowSnackbar">
        <v-icon>notifications</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>notifications</v-icon>
      </v-btn>-->
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>apps</v-icon>
      </v-btn> -->
      <template v-for="(item, index) in navHeadRight">
        <template v-if="!item.children||item.children.length>0">
          <v-menu :key="item.id" bottom :min-width="166">
            <v-tooltip slot="activator" bottom :key="index" v-if="item.icon">
              <v-btn flat icon slot="activator" color="primary">
                <v-icon>{{item.icon}}</v-icon>
              </v-btn>
              <span>{{item.title}}</span>
            </v-tooltip>
            <v-btn slot="activator" :key="index" flat v-else>
              <div class="v-btn__content" v-if="item.code=='userlogged'">{{$store.state.auth.user.ten_nd}}
                <v-icon>arrow_drop_down</v-icon>
              </div>
              <div class="v-btn__content" v-else>{{children.title}}</div>
            </v-btn>

            <v-list>
              <v-list-tile :key="index" v-for="(children, index) in item.children" @click="MenuAction(children)">
                <v-list-tile-action>
                  <v-icon>{{children.icon}}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{children.title}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <v-tooltip bottom :key="index" v-if="item.icon">
            <v-btn flat icon slot="activator" @click="MenuAction(item)">
              <v-icon>{{item.icon}}</v-icon>
            </v-btn>
            <span>{{item.title}}</span>
          </v-tooltip>
          <!-- <v-btn :key="index" icon v-if="item.icon">
            <div class="v-btn__content" v-html="item.icon"></div>
          </v-btn> -->
          <v-btn :key="index" flat v-else>
            <div class="v-btn__content">{{children.title}}</div>
          </v-btn>
        </template>
      </template>
    </v-toolbar>
    <v-content>
      <div class="container page">
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" :right="snackbar.x==='right'"
          :left="snackbar.x==='left'" :bottom="snackbar.y==='bottom'" :top="snackbar.y==='top'"
          :timeout="snackbar.timeout" :multi-line="snackbar.mode==='multi-line'"
          :vertical="snackbar.mode==='vertical'">
          {{ snackbar.text }}
          <v-btn color="" flat @click="snackbar.show=false">
            <i class="material-icons">close</i>
          </v-btn>
        </v-snackbar>
        <router-view></router-view>
      </div>
    </v-content>
    <v-navigation-drawer temporary :right="right" v-model="$store.state.$notification"
      fixed app>
      <v-layout row v-if="!notification||notification.length<1">
        <v-flex xs12 sm12>
          <p class="text-md-center mt-3 primary--text">Thông báo</p>
        </v-flex>
      </v-layout>
      <v-list two-line v-else>
        <template v-for="(item, index) in notification">
          <v-subheader v-if="item.header" :key="item.header">
            {{ item.header }}
          </v-subheader>
          <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
          <v-list-tile v-else :key="item.title" avatar>
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <!-- <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list> -->
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <!-- <v-layout wrap class="pl-3"> -->
      <v-spacer></v-spacer>
      <!-- <v-flex xs9 sm9 md10></v-flex> -->
      <v-flex xs3 sm3 md2 class="text-lg-right">
        <span>Coppyright &copy; 2019</span>
      </v-flex>
      <!-- </v-layout> -->
    </v-footer>
  </div>
</template>

<script>
import * as storageAuth from '@/plugins/storage-auth'
export default {
  components: {
  },
  data: () => ({
    // clipped: this.$vuetify.breakpoint.lgAndUp,
    drawer: true,
    fixed: false,
    right: true,
    miniVariant: false,
    // rightDrawer: false,
    navContentLeft: [
      {
        title: 'Calculate',
        icon: 'apps',
        push: 'calculate'
      }
    ],
    navHeadRight: [
      {
        title: 'Lucky zone',
        icon: 'offline_bolt',
        url: '/',
        push: '/'
      }
    ],
    menuUser: [
      {icon: "ballot",title: "Profile",push: "profile"},
      {icon: "settings_applications",title: "Setting",push: "setting"},
      {icon: "exit_to_app",title: "Logout",go: "auth",store: "auth/logout"}
    ]
  }),
  created() {
    // console.log(this.authUser)
    // this.$store.dispatch('languages_items/init')
  },
  computed: {
    snackbar() {
      return this.$store.state.$message
    },
    clipped() {
      var mobile = !this.$vuetify.breakpoint.lgAndUp
      return mobile
    },
    authUser() {
      var rs = this.$store.state.auth.user
      return rs
    },
    language() {
      const rs = this.$store.state.$language
      return rs
    },
    notification() {
      const rs = this.$store.state.notification.items
      return rs
    },
    navHeadLeft() {
      return {
        title: 'Lucky zone',
        icon: 'dashboard',
        url: '/',
        push: '/'
      }
    }
  },
  methods: {
    MenuAction(item) {
      if(item.store) this.$store.dispatch(item.store,true)
      if(item.go) this.$router.go('/' + item.go)
      if(item.push) this.$router.push('/' + item.push)
    },
    ShowSnackbar() {
      this.$store.dispatch('message',{text: 'Hello, I\'m a snackbar'})
    },
    signOut() {
      this.$store.dispatch('auth/signOut',true)//.then(() => { this.$router.push('/auth') })
    },
  },
}
</script>
<style lang="scss">
@import "@/assets/scss/vuetify.scss";
@import "@/assets/scss/quill.scss";
</style>
