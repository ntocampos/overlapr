import { OverlapData, OverlapItem } from 'src/types'

const findCluster = (data: OverlapData, item: OverlapItem) => {
  let cluster = new Set([item.id])

  for (let conflictId of cluster) {
    data[conflictId].conflicts.forEach(cluster.add, cluster)
  }

  return [...cluster]
}

const assignContext = (data: OverlapData) => {
  const items = data._ordered

  items.forEach((item) => {
    if (item.context) return
    const cluster = findCluster(data, item)
    const maxDepth = Math.max(...cluster.map((id) => data[id].depth ?? -1))

    cluster.forEach((id) => (data[id].context = maxDepth + 1))
  })

  return data
}

export default assignContext
