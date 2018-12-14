const Routes = {
  advanceGame: (id) => (`games/${id}/advance`),
  game: (id) => (`games/${id}`),
  games: (pageNumber) => (`games?page=${pageNumber}`),
  resetGame: (id) => (`games/${id}/reset`)
}
export default Routes
