var vscode = require('vscode');
var AbstractAction = require('./AbstractAction.js');

module.exports = class connectPostgreSQL extends AbstractAction
{
    
    execution(server = null) {
        if(server !== null){
            this.sqlMenager.changeServer(server);
            return;
        }

        vscode.window.showQuickPick(this.getAllServerName(), {
            matchOnDescription:false,
            placeHolder:'Choice connected server or create new connection'
        }).then((object) => {
            if(typeof object !== 'undefined'){
                var index = object.number;
                if (index !== undefined){
                    this.sqlMenager.changeServer(this.sqlMenager.server[index]);
                }else{
                    vscode.commands.executeCommand('extension.connectToSQLServer');
                }
                
            }
        });
    }

    getAllServerName(){
        var allServerName = [];

        allServerName.push({
            label:'New connection',
            description:'create new connection'
        });

        for (var i = 0; i < this.sqlMenager.server.length; i++) {
            const server = this.sqlMenager.server[i];
            allServerName.push({
                number: i,
                label: `${i+1}) ${server.getName()}`,
                description: ''
            });
        }
        return allServerName;
    }


};
