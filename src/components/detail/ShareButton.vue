<template>
  <q-btn
    flat
    icon="share"
  >
    <q-popup-proxy class="share-popup" breakpoint="0">
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
        <div class=" q-px-sm q-pb-md flex column justify-center">
          <q-input v-model="entityDetailLink" readonly class="q-mr-md q-mb-md link-input"/>
          <q-btn flat label="Link kopieren" color="primary" @click="copyLink()" v-close-popup/>
        </div>
      </q-card>
    </q-popup-proxy>
  </q-btn>
</template>
<script setup>
import {ref, defineProps} from 'vue'
import {useQuasar} from 'quasar'
import {useBaseStore} from 'src/stores/base-store'
import {getGermanEntityName, getTypeFromEntity, isInIframe} from 'src/utils'

const $q = useQuasar()

const props = defineProps({
  entity: {
    type: Object,
    default: {},
  },
})

const entityType = getTypeFromEntity(props.entity)

const baseStore = useBaseStore()

const entityDetailLink = `${baseStore.parentLocation.origin}${baseStore.parentLocation.pathname}?entity=${entityType}s&id=${props.entity.id}`

const copyLink = () => {
  // if (isInIframe) {
  const message = {
    type: "copy_to_clipboard",
    payload: entityDetailLink,
  }
  window.parent.postMessage(message, '*')
  // } else {
  //   navigator.clipboard.writeText(entityDetailLink)
  // }

  $q.notify({
    message: 'Link kopiert',
    color: 'primary',
    position: "top",
    timeout: 1000,
  })
}

const shareDialog = ref(false)
</script>
<style lang="scss">
.share-popup {
  overflow: hidden;
  .link-input {
    width: 400px;
  }
}

</style>
