<template>
  <div id="pictureDetailView">
    <a-row :gutter="[16, 16]">
      <a-col :sm="24" :md="16" :xl="18">
        <a-card title="图片预览">
          <a-image :src="picture.url" style="max-height: 600px; object-fit: contain" />
        </a-card>
      </a-col>
      <a-col :sm="24" :md="8" :xl="6">
        <a-card title="图片信息">
          <a-descriptions :column="1">
            <a-descriptions-item label="作者">
              <a-space>
                <a-avatar :src="picture.user?.userAvatar" :size="24" />
                <a-typography-text>{{ picture.user?.userName }}</a-typography-text>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="图片名称"
              >{{ picture.name ?? '未命名' }}
            </a-descriptions-item>
            <a-descriptions-item label="图片简介"
              >{{ picture.introduction ?? '--' }}
            </a-descriptions-item>
            <a-descriptions-item label="图片分类"
              >{{ picture.category ?? '默认' }}
            </a-descriptions-item>
            <a-descriptions-item label="图片标签">
              <a-tag v-for="(tag, index) in picture.tags" :key="index">{{ tag }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="图片格式"
              >{{ picture.picFormat ?? '--' }}
            </a-descriptions-item>
            <a-descriptions-item label="图片宽度"
              >{{ picture.picWidth ?? '--' }}
            </a-descriptions-item>
            <a-descriptions-item label="图片高度"
              >{{ picture.picHeight ?? '--' }}
            </a-descriptions-item>
            <a-descriptions-item label="图片宽高比"
              >{{ picture.picScale ?? '--' }}
            </a-descriptions-item>
            <a-descriptions-item label="图片大小"
              >{{ formatSize(picture.picSize) }}
            </a-descriptions-item>
          </a-descriptions>
          <a-space wrap>
            <a-button type="primary" @click="doDownload"
              >下载
              <template #icon>
                <DownloadOutlined />
              </template>
            </a-button>
            <a-button v-if="canEdit" :icon="h(EditOutlined)" type="default" @click="doEdit"
              >编辑
            </a-button>
            <a-button v-if="canDelete" :icon="h(DeleteOutlined)" danger @click="doDelete"
              >删除
            </a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import { DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { deletePictureUsingPost, getPictureVoByIdUsingGet } from '@/api/pictureController.ts'
import { downloadImage, formatSize } from '../utils'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { useRouter } from 'vue-router'
import {SPACE_PERMISSION_ENUM} from "@/constants/space.ts";

interface Props {
  id: string | number
}

const props = defineProps<Props>()
const picture = ref<API.PictureVO>({})
// 获取图片信息
const getPictureDetail = async () => {
  const res = await getPictureVoByIdUsingGet({ id: props.id })
  if (res.data.code === 200 && res.data.data) {
    picture.value = res.data.data
  } else {
    message.error('获取图片失败:' + res.data.message)
  }
}
onMounted(() => {
  getPictureDetail()
})

const loginUserStore = useLoginUserStore()

const doDelete = async () => {
  const id = props.id
  if (!id) {
    return
  }
  const res = await deletePictureUsingPost({ id })
  if (res.data.code === 200) {
    message.success('删除成功')
  } else {
    message.error('删除失败：' + res.data.message)
  }
}

const router = useRouter()
const doEdit = () => {
  router.push({
    path: '/addPicture',
    query: {
      id: picture.value.id,
      spaceId: picture.value.spaceId,
    },
  })
}

const doDownload = () => {
  downloadImage(picture.value.url)
}

// 通用权限检查函数
function createPermissionChecker(permission: string) {
  return computed(() => {
    return (picture.value.permissionList ?? []).includes(permission)
  })
}

// 定义权限检查
const canEdit = createPermissionChecker(SPACE_PERMISSION_ENUM.PICTURE_EDIT)
const canDelete = createPermissionChecker(SPACE_PERMISSION_ENUM.PICTURE_DELETE)
</script>
<style scoped></style>
