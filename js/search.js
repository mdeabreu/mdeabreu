index = lunr(function () {
    this.field('title', {boost: 10})
    this.field('content')
    this.ref('id')
  })
var xml = $.get("/atom.xml", success);

function success(data) {
  var entries = data.getElementsByTagName("entry");
  for (var i = 0; i < entries.length; i++) {
    //console.log(entries[i]);
    var entry = entries[i];
    var id = $(entry).find("id").text();
    var title = $(entry).find("title").text();
    var content = $(entry).find("content").text();
    //console.log(title);
    index.add({
      id: id,
      title: title,
      content: content
    })
  }
}