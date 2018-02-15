angular.module('bookChallenge', [])
  .controller('BookChallengeController', function($scope) {
    //Title, Author, cover, ebook, John Charles
    //store in localStorage to cache
    $scope.bookData = [];
    $scope.sortAttributes = [null, null];
    $scope.sortReverse = false;
    $scope.sortReverseString = "up";
    $scope.columnNames = [];
    $scope.names = [];
    $scope.comments = [];
    $scope.ratings = [];

    $scope.changeSort = function() {
      console.log($scope.sortAttribute);
      console.log($scope.sortReverse);
      if($scope.sortAttribute == 'rating' && $scope.sortReverse) {
        $scope.sortAttributes = ['!!rating', 'rating', null];
      } else {
        $scope.sortAttributes = [$scope.sortAttribute, null];
      }
    }
    $scope.reverseSort = function() {
      $scope.sortReverse = !$scope.sortReverse;
      if($scope.sortReverse){
        $scope.sortReverseString = "down";
      } else{
        $scope.sortReverseString = "up";
      }
      $scope.changeSort();
    }

    Tabletop.init({
      key: "1Avp1EwBcBqS1kW1d9FSN0QA8Uj5J2InqXnMdjIYqlkY"
    , callback: function(data,tableTop){
      $scope.totals = data.pop();
      endingCols = tableTop.models.Sheet1.column_names.slice(4)
      for(var i = 0; i < endingCols.length; i++){
        if(endingCols[i].indexOf(" says")==-1 && endingCols[i].indexOf(" rates")==-1){
          $scope.names.push(endingCols[i]);
        }
      }

      for(var i=0; i < data.length; i++) {
        data[i]["ratings"] = []
        for(var key in data[i]){
          if(key.indexOf(" rates")!==-1 && data[i][key]!==""){
            data[i]["ratings"].push(data[i][key]);
          }
        }
        var sum = 0;
        for(var r in data[i]["ratings"]){
          sum += parseInt(data[i]["ratings"][r]);
        }
        if(sum != 0) {
          data[i]["rating"] = (sum/data[i]["ratings"].length).toFixed(0);
        }
      }
      $scope.people = []
      for(var i = 0; i < $scope.names.length; i++) {
        $scope.people.push({name: $scope.names[i], total: $scope.totals[$scope.names[i]]})
      }
      $scope.sortBySelectors = [{ name: 'NPR Ranking', value: null}, {name: 'Rating', value: 'rating'}];
      $scope.sortByOptions = ['index'];
      for(var i = 0; i < $scope.names.length; i++){
        $scope.sortBySelectors.push({
          name: 'Unread by '+$scope.names[i],
          value: $scope.names[i]
        });
      }
      console.log($scope.sortBySelectors);
      window.bookData = data;
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
