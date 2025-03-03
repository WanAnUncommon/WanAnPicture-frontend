// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** getSpaceAnalyzeCategory POST /api/space/analyze/category */
export async function getSpaceAnalyzeCategoryUsingPost(
  body: API.SpaceCategoryAnalyzeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceAnalyzeCategoryResponse_>('/api/space/analyze/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** getSpaceAnalyzeRank POST /api/space/analyze/rank */
export async function getSpaceAnalyzeRankUsingPost(
  body: API.SpaceRankAnalyzeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpace_>('/api/space/analyze/rank', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** getSpaceAnalyzeSize POST /api/space/analyze/size */
export async function getSpaceAnalyzeSizeUsingPost(
  body: API.SpaceSizeAnalyzeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceAnalyzeSizeResponse_>('/api/space/analyze/size', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** getSpaceAnalyzeTag POST /api/space/analyze/tag */
export async function getSpaceAnalyzeTagUsingPost(
  body: API.SpaceTagAnalyzeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceAnalyzeTagResponse_>('/api/space/analyze/tag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** getSpaceAnalyzeUsage POST /api/space/analyze/usage */
export async function getSpaceAnalyzeUsageUsingPost(
  body: API.SpaceUsageAnalyzeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSpaceAnalyzeUsageResponse_>('/api/space/analyze/usage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** getSpaceAnalyzeUser POST /api/space/analyze/user */
export async function getSpaceAnalyzeUserUsingPost(
  body: API.SpaceUserAnalyzeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceAnalyzeUserResponse_>('/api/space/analyze/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
