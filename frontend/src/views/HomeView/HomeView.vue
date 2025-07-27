<template>
  <ScrollText :text="randomWords" :speed="20" />
  <HeroSection
    heroTitle="What is the Native Digital Networking Community?"
    heroDetails="It's a directory specifically for Indigenous entrepreneurs located in Canada,"
    heroHighlight="and it's free to join!"
    heroLink="/register"
    heroBtn="Sign up today!"
  />
  <section class="join">
    <h2 class="join__heading"></h2>
  </section>
</template>

<script setup>
import { HeroSection } from '@/components'
import { ref, onMounted } from 'vue'
import ScrollText from '@/components/ScrollText/ScrollText.vue'

const words = [
  'Tānsi, pihtikwī',
  'tânisi',
  'Čwé:ʔn',
  'Kuei',
  'Aatituu',
  'Kwei',
  'Dä́ninchʼi?',
  'yáu',
  'ʔəy̓ sweyəl',
  'Dèkant’ea?',
  'Ha7lh skwáyel',
  'Haƞ',
  'Kuei',
  'baaqiidax̣aʔƛik?',
  'ᐛᒋᔭ',
  'Boozhoo',
  'Nts’é t’ínt’eh?',
  'Pjila’si',
  'Taanshi',
  'ᑖᓂᓯ',
  'Uy skweyul',
  'Edląnet’e!',
  'Tunngasugit',
  'Komaw sav aw?',
  'Singaay ‘laa',
  'Kwaï',
  'Halu',
  'Dä̀nnchʼe',
  'Boozhoo',
  'Ndio',
  'Ambá wasté',
  'ʔéx kʷ n̓',
  'Sgë:nö',
  'Hau Mitakuyapi',
  'ᑖᓂᓯ ᑭᔭ',
  'ᑖᓂᓯ',
  'Ama sah',
  'Weytk',
  'Shékoli',
  'Haluuqqagit',
  'aytew skwayel',
  'Hadih',
  'Éy swáyel',
  'Atelihai',
  '‘nit amhl wilawina?',
  'Biindigeg',
  'bozho',
  '𝖦̲ilakas’la',
  'ᑕᐋᐧᐤ ᐱᐦᑎᑫᐧ',
  '?iy te kwayel',
  'Kwe',
  'Wáa sá iyatee?',
  'Drin hǫzǫ',
  'Koolamalsi',
  'čačim hihak kʷaa',
  'Kwey',
  'ÍY SȻÁĆEL',
  'tānisi kiya?',
  'pìjàshin',
  'Dẕenēs̱ hoti’e',
  'Kwe’',
  'tawāw pīhtikwē',
  'Waaciye',
  'Aaniin',
  'Aaniin',
  'ʔə́y̕ skʷáči',
  'Sge’:no',
  'N̓it',
  'Pihtikwī',
  'Hadih',
  'wāciyē',
  'Kwey',
  'Tānsi',
  'Âba wathtech',
  'Booñ zhoor',
  'Qanuqitpit?',
  'Qanuqitpit',
  'Segoli',
  'Boozhoo',
  'Pee-piihtikweek!',
  'Wâciyê',
  'taanshi',
  'Háu',
  'ᐊᐃᖓᐃ',
  'qey',
  'Quvianaqtusi Qaigapsi',
  'ᑐᙵᓱᒋᑦ',
  'wahcehtahsu',
  'Dànìtʼē?',
  'Aaniin',
  'Ai',
  'pìjàshin',
  'Kwe',
  'čɛčɛhaθɛč',
  'Do’eent’aa?',
  'Dàąt’e',
  'ᑖᓂᓯ',
  'tânisi',
  'yaù',
  'Alo',
  'way̓',
  'Ya’uc̓',
  'kwei',
  'Dzin guzin',
  'Drin gwiinzii',
  'Dzīnísī Gújā',
  'Oki',
  'Shé:kon',
  'waachiyaah',
  'Wotziye',
  'Bonjowr',
  'Niit',
  'k̓alhwá7acw',
  'Yaw',
  'Boozhoo',
  'Kiʔsuʔk kyukyit',
  'kíl ‘láa',
  'tānisi',
  'Negha Dágǫht’e',
  'Aaniin',
]

const shuffleWords = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const hasShuffled = ref(false)
const randomWords = ref([])

onMounted(() => {
  if (!hasShuffled.value) {
    randomWords.value = shuffleWords([...words])
    hasShuffled.value = true
  }
})
</script>

<style src="./HomeView.scss"></style>
