
//require alle routes //Ikke services
module.exports = (app) => {
    require ('./cykel_kategoriRoute/alleKategorier')(app);             
    require ('./cykel_kategoriRoute/cykelRoute')(app);             
    require ('./cykel_kategoriRoute/visEnCykel')(app);             
    require ('./tilbudRoute')(app);
    require ('./udstyrRoute/udstyrAlleInfo')(app);             
    require ('./udstyrRoute/alleUdstyrKategori')(app);             
    require ('./udstyrRoute/udstyrRoute')(app);
    require ('./kontakt')(app);                              
    require ('./nyheder')(app);  
    require ('./avanceretSoeg')(app);
    require ('./adminRoute/admin')(app);                                                                                                                                
    // require ('./adminRoute/adminRoute')(app);                                                                                                                                
    require ('./adminRoute/adminCykler')(app);                                                                                                                                
    // require ('./adminRoute/adminUdstyr')(app);                                                                                                                                
};