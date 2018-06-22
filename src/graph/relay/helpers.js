export const connectionHelper = list => ({
  edges: (list || []).map(node => ({ node }))
})
