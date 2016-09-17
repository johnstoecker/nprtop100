angular.module('bookChallenge', [])
  .controller('BookChallengeController', function($scope) {
    //Title, Author, cover, ebook, John Charles
    //store in localStorage to cache
    $scope.bookData = [];
    $scope.columnNames = [];
    $scope.names = [];
    $scope.extraCols = [];

    Tabletop.init({
      key: "1Avp1EwBcBqS1kW1d9FSN0QA8Uj5J2InqXnMdjIYqlkY"
    , callback: function(data,tableTop){
      $scope.totals = data.pop();
      // $scope.tableTop = tableTop;
      endingCols = tableTop.models.Sheet1.column_names.slice(4)
      for(var i = 0; i < endingCols.length; i++){
        if(endingCols[i].indexOf(" says")==-1){
          $scope.names.push(endingCols[i]);
        } else {
          $scope.extraCols.push(endingCols[i]);
          console.log(data[0][endingCols[i]]);
        }
      }
      console.log($scope.names);
      console.log($scope.totals);

      $scope.bookData = data;
      $scope.$apply();
    }
    , simpleSheet: true})

    // for(var i = 57; i < asdf.length; i++) {
    //   sleepFor(2000);
    //   item = asdf[i];
    //   console.log(i);
    //   $.get("https://www.googleapis.com/books/v1/volumes?q="+item.Title+"+inauthor:"+item.Author, function(data){thumbNails.push(data.items[0].volumeInfo.imageLinks.smallThumbnail);})
    // }
    //
});
