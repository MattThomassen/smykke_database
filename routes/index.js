
//require alle routes //Ikke services
module.exports = (app) => {
    require ('./cykel_kategoriRoute/alleKategorier')(app);             
    require ('./cykel_kategoriRoute/cykelRoute')(app);             
    require ('./cykel_kategoriRoute/visEnCykel')(app);             
    require ('./tilbudRoute')(app);
    require ('./udstyrRoute/alleUdstyrKategori')(app);             
    require ('./udstyrRoute/udstyrRoute')(app);             
    require ('./udstyrRoute/udstyrAlleInfo')(app);             
};