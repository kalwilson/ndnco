import { createRouter, createWebHistory } from 'vue-router'
import {
  HomeView,
  DirectoryView,
  BusinessDetailsView,
  RegisterView,
  AboutView,
  LegalView,
  CookiesPolicyView,
  PrivacyPolicyView,
  TermsConditionsView,
  LoginView,
} from '@/views'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/directory', name: 'Directory', component: DirectoryView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/directory/:id', name: 'Business', component: BusinessDetailsView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/login', name: 'Login', component: LoginView },

  { path: '/legal', name: 'Legal', component: LegalView },
  { path: '/legal/cookies-policy', name: 'Cookies Policy', component: CookiesPolicyView },
  { path: '/legal/privacy-policy', name: 'Privacy Policy', component: PrivacyPolicyView },
  { path: '/legal/terms-conditions', name: 'Terms & Conditions', component: TermsConditionsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
