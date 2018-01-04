// require JSON file containing our posts
const postsJSON = require('../blogposts.json');

/* This function gets the post data from JSON 'database',
 * renders post template if the post found by its unique id,
 * and if post is nonexistent, an error page will render.
 */
const getPostById = (uniqueId, callback) => {

    let posts = postsJSON.posts;

    // Return true if post id (path) is correct / exists
    const findPost = (post) => {
        return post.id === uniqueId;
    };

    let post = posts.find(findPost);

    if(!post) {
        return callback(new Error(
            'Nincsen egyező bejegyzés-azonosító '
            + uniqueId + ' néven!'
            )
        );
    }
    return callback(null, post);
};

// Callback function for the home route.
const home = (req, res) => {

    let posts = postsJSON.posts;

    // Renders homepage.
    res.render('home', {
        title: 'Kizombavilág',
        currentYear: new Date().getFullYear(),
        url: '',
        posts: posts
    });
};

// Callback function for the blogposts.
const singlePost = (req, res) => {

    let posts = postsJSON.posts;
    // Gets the user supplied id from request body.
    let uniqueId = req.params.id;

    /*console.log(uniqueId);*/
    
     /* This function gets the post data from JSON 'database',
     * renders post template if the post found by its unique id,
     * and if post is nonexistent, an error page will render.
     */
    getPostById(uniqueId, (err, post) => {
        let posts = postsJSON.posts;
        if (err) {
            // Renders error page.
            res.render('notFound', {
                posts: posts,
                currentYear: new Date().getFullYear(),
                url: '',
                title: "A megadott címen nem található blogbejegyzés!"
            });
        }
        else {
            // Set variables that are returned to the browser.
            let title = post.title;
            let author = post.author;
            let date = post.date;
            let postBody = post.post_body;
            let url = 'cikk/' + post.id;

            // Renders blogpost, sends post-data.
            res.render('singlePost', {
                posts: posts,
                title: title,
                author: author,
                date: date,
                postBody: postBody,
                url: url,
                currentYear: new Date().getFullYear()
            });
        }
    });
};

// Callback function for a non-existing page.
const notFound = (req, res) => {
    let posts = postsJSON.posts;
    res.render('notFound', {
        posts: posts,
        currentYear: new Date().getFullYear(),
        url: '',
        title: "Nem ezt az oldalt keresed."
    });
};


// Export the functions.
module.exports = {
    home: home,
    singlePost: singlePost,
    notFound: notFound
};