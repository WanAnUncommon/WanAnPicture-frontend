<template>
  <div class="pictureList">
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="dataList"
      :loading="loading"
    >
      <template #renderItem="{ item: picture }">
        <a-list-item style="padding: 0">
          <a-card hoverable @click="doPictureClick(picture)">
            <template #cover>
              <img
                :alt="picture.name"
                :src="picture.thumbnailUrl ?? picture.url"
                style="height: 180px; object-fit: cover"
              />
            </template>
            <a-card-meta :title="picture.name">
              <template #description>
                <a-flex>
                  <a-tag color="green">{{ picture.category ?? '默认分类' }}</a-tag>
                  <a-tag v-for="tag in picture.tags" :key="tag">{{ tag }}</a-tag>
                </a-flex>
              </template>
            </a-card-meta>
            <template v-if="showOp" #actions>
              <a-space v-if="canEdit" @click="(e) => doEdit(picture, e)">
                <edit-outlined />
                编辑
              </a-space>
              <a-space v-if="canDelete" @click="(e) => doDelete(picture, e)" >
                <delete-outlined/>
                删除
              </a-space>
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'
import {deletePictureUsingPost} from "@/api/pictureController.ts";
import {message} from "ant-design-vue";

interface Props {
  dataList?: API.PictureVO[]
  loading?: boolean
  showOp?: boolean
  onReload?: () => void
  canEdit?: boolean
  canDelete?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  dataList: () => [],
  loading: false,
  showOp: false,
  canDelete: false,
  canEdit: false,
})

const router = useRouter()
const doPictureClick = (picture: API.PictureVO) => {
  router.push({
    path: `/picture/${picture.id}`,
  })
}

const doDelete = async (picture,e) => {
  // 阻止冒泡
  e.stopPropagation()
  const id = picture.id
  if (!id) {
    return
  }
  const res = await deletePictureUsingPost({ id })
  if (res.data.code === 200) {
    message.success('删除成功')
    props.onReload?.()
  } else {
    message.error('删除失败：' + res.data.message)
  }
}

const doEdit = (picture,e) => {
  // 阻止冒泡
  e.stopPropagation()
  router.push({
    path: '/addPicture',
    query: {
      id: picture.id,
      spaceId: picture.spaceId
    }
  })
}

</script>
<style scoped></style>
