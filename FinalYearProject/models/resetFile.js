var blocks = {};

module.exports.addBlock = function(name, block) {
    blocks[name] = block;
};

module.exports.getBlock = function(name) {
    return blocks[name];
};

module.exports.delBlock = function(name) {
    delete blocks[name];
};

module.exports.list = function() {
    return Object.keys(blocks);
};