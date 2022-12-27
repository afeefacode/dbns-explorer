<template>
  <div>
    <q-btn
      flat
      icon="share"
      @click="shareDialog = true"
    ></q-btn>
    <q-dialog v-model="shareDialog" class="share-dialog">
      <q-card class="q-pl-md">
        <q-card-section class="row justify-between items-center">
          <div class="text-h5">{{ getGermanEntityName(entityType, 'singular') }} teilen</div>
          <div class="row items-center no-wrap">
            <q-btn
              round
              flat
              icon="clear"
              v-close-popup
            >
            </q-btn>
          </div>
        </q-card-section>
        <div class="row q-px-lg q-pb-xl">
          <q-input label="Standard" readonly class="q-mr-md"/>
          <q-btn flat label="Link kopieren" color="primary" @click="copyLink"/>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import {ref, defineProps} from 'vue'
import {getGermanEntityName, getTypeFromEntity} from 'src/utils'

const props = defineProps({
  entity: {
    type: Object,
    default: {},
  },
})

const entityType = getTypeFromEntity(props.entity)

console.log('document.referrer', document.referrer)
console.log('document.location.href', document.location.href)

console.log('window.parent.location', window.parent[0]?.location)
console.log('window.top', window.top)
console.log('window.self', window.self)

const link = `${window.parent[0]?.location.origin}/?entity=${entityType}s&id=${props.entity.id} `
const copyLink = () => {
  console.log('link', link)
}

const shareDialog = ref(false)
</script>
<style lang="scss">
.share-dialog {
  .q-dialog__backdrop {
    opacity: 0;
  }
}
</style>
