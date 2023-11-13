
var file1 = "E:\\Gravações\\2023\\Março\\MD 016 - Por que ler-1 - 2023-03-06 19-45-15.mp4";
var nomeDoTrabalho = "MD16 - Por que ler?";


var cortes = [

[132.891, 134.640], [135.135, 136.059], [136.554, 137.346], [138.039, 139.095], [140.943, 141.603], 
[142.065, 148.500], [148.995, 151.272], [151.668, 152.526], [153.087, 155.727], [156.123, 161.535], [161.898, 163.119],


[189.717, 190.806], [191.268, 192.060], [192.555, 195.360], [196.680, 198.264], [198.726, 199.584], [200.211, 200.904], [201.465, 201.960],
[202.356, 203.841], [204.501, 214.401]

];



alert("funcionou...");

var pastaDeTrabalho = app.project.rootItem.createBin(nomeDoTrabalho);
app.project.importFiles([file1], false, pastaDeTrabalho);

var itemImportado = pastaDeTrabalho.children[0];
var sequencia = app.project.createNewSequenceFromClips(nomeDoTrabalho,   [itemImportado]   , pastaDeTrabalho)

//app.project.activeSequence.videoTracks[0].insertClip(backsBin.children[0], 0);
app.project.activeSequence.audioTracks[1].clips[0].remove(1,1);

var activeCips = 0;
var inicio = 0;
var fim = 0;
var clipEnds = 0;

activeCips = 0;
inicio = cortes[0][0];
fim = cortes[0][1];
clipEnds = fim - inicio;

app.project.activeSequence.videoTracks[0].clips[activeCips].end = clipEnds;
app.project.activeSequence.audioTracks[0].clips[activeCips].end = clipEnds;
app.project.activeSequence.videoTracks[0].clips[activeCips].outPoint = clipEnds;
app.project.activeSequence.audioTracks[0].clips[activeCips].outPoint = clipEnds;

app.project.activeSequence.videoTracks[0].clips[activeCips].inPoint = inicio;
app.project.activeSequence.audioTracks[0].clips[activeCips].inPoint = inicio;

 
for (x = 1; x< cortes.length; x++){
    $.writeln("Passada " + x + " Tempo:" + (fim-inicio ) );

    inicio = cortes[x][0];
    fim = cortes[x][1];
     
    //SOFT CUT
    inicio = inicio - 0.100;
    fim = fim + 0.100;
    //--------------------------------- 


    //Verificando se o vídeo é muito curto para ser cortado.
    if (inicio < fim  &&  fim-inicio > 0.250){
    
        activeCips = activeCips + 1;

        app.project.activeSequence.videoTracks[0].insertClip( itemImportado, clipEnds );
        app.project.activeSequence.audioTracks[1].clips[0].remove(1,1); 

    
        clipEnds = (fim - inicio) + clipEnds; 

        app.project.activeSequence.videoTracks[0].clips[activeCips].end = clipEnds;
        app.project.activeSequence.audioTracks[0].clips[activeCips].end = clipEnds;
        app.project.activeSequence.videoTracks[0].clips[activeCips].outPoint = clipEnds;
        app.project.activeSequence.audioTracks[0].clips[activeCips].outPoint = clipEnds;

        app.project.activeSequence.videoTracks[0].clips[activeCips].inPoint = inicio;
        app.project.activeSequence.audioTracks[0].clips[activeCips].inPoint = inicio;


    }
    else {
        $.writeln("Marcação INICIO FIM Invalidos" + inicio + " -- " + fim);
    }

    
}

$.writeln("Duração total da Sequencia:" + clipEnds);
app.project.activeSequence.setOutPoint(clipEnds);



function secs(valor){
    return new Time().seconds = valor;
}

function hMSToS(hora, minutos, segundos){
        return (hora*60*60)+(minutos*60)+segundos;
}



