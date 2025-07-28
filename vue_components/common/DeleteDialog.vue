<script lang="ts" setup>
import ActionButton from './ActionButton.vue'
import { Trash2 } from 'lucide-vue-next'
import AlertDialog from '../ui/AlertDialog.vue'
import AlertDialogTrigger from '../ui/AlertDialogTrigger.vue'
import AlertDialogContent from '../ui/AlertDialogContent.vue'
import AlertDialogHeader from '../ui/AlertDialogHeader.vue'
import AlertDialogTitle from '../ui/AlertDialogTitle.vue'
import AlertDialogDescription from '../ui/AlertDialogDescription.vue'
import AlertDialogFooter from '../ui/AlertDialogFooter.vue'
import AlertDialogCancel from '../ui/AlertDialogCancel.vue'
import AlertDialogAction from '../ui/AlertDialogAction.vue'
const props = defineProps<{ onConfirm: () => void }>()
</script>
<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <ActionButton variant="destructive" :icon="Trash2">Delete</ActionButton>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the item.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="props.onConfirm" class="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
