import { openDatabase, Database, SQLTransaction, Query, SQLResultSet, SQLError } from 'expo-sqlite';
import Note from './../models/Note';

const databaseName: string = 'writing',
    tableName: string = 'writings';

const getDb = function (name: string = databaseName): Database {
    //opent db als ze bestaat, maakt aan als ze nog niet bestaat
    return openDatabase(name);
}

const transaction = function (db: Database): Promise<SQLTransaction> {

    return new Promise(function (resolve, reject) {
        db.transaction(
            (tx: SQLTransaction) => {
                resolve(tx);
            },
            (error) => {
                reject(error)
                console.info(error)
            },
            () => {
                console.info('Transaction succeded 🥳')
            }
        )
    })
}

const query = (tx: SQLTransaction, query: Query): Promise<SQLResultSet> => {
    return new Promise(function (resolve, reject) {
        tx.executeSql(
            query.sql,
            query.args,
            (tx: SQLTransaction, res: SQLResultSet) => {
                resolve(res)

            },
            (tx: SQLTransaction, error: SQLError): boolean => {
                reject(error)
                return true;
            }
        )
    })
}

export const initWritings = async () => {
    const db = getDb();
    const tx = await transaction(db).catch(error => console.error(error));
    console.log({ tx });

    if (tx) {
        const res = await query(tx, {
            sql: "CREATE TABLE IF NOT EXISTS 'writings' (id integer primary key autoincrement, title text, author text, note text)",
            args: []
        });

        console.log(res)
    }
}

// C reate
export const writings = {
    create: async (n: Note): Promise<SQLResultSet> => {

        return new Promise(async function (resolve, reject) {
            const db = getDb();
            const tx = await transaction(db);

            const res = await query(tx, {
                sql: "INSERT INTO `writings` (id, title, author, note) values(?, ?, ?, ?)",
                args: [null, n.title, n.author, n.text],
            }).catch((error) => {
                reject(error);
            });

            if (res) {
                resolve(res)
            }
        })

    },

    read: {
        all: (): Promise<SQLResultSet> => {
            return new Promise(async function (resolve, reject) {
                const db = getDb();
                const tx = await transaction(db);

                const res = await query(tx, {
                    sql: "SELECT * FROM 'writings'",
                    args: [],
                }).catch((error) => {
                    reject(error);
                });

                if (res) {
                    resolve(res)
                }
            })
        },
        detail: (id: Number): Promise<SQLResultSet> => {
            return new Promise(async function (resolve, reject) {
                const db = getDb();
                const tx = await transaction(db);

                const res = await query(tx, {
                    sql: "SELECT * FROM 'writings' WHERE id = ?",
                    args: [id],
                }).catch((error) => {
                    reject(error);
                });

                if (res) {
                    resolve(res)
                }
            })
        },
        
        
    },

    update: (n: Note): Promise<SQLResultSet> => {
        return new Promise(async function(resolve, reject) {
            const db = getDb(),
                tx = await transaction(db);
    
            const res = await query(tx, {
                sql: "UPDATE `writings` SET title = ? , author = ? , note = ? WHERE id = ?",
                args: [n.title, n.author, n.text, n.id],
            }).catch((error) => {
                reject(error);
            });
 
            if (res) resolve(res);
        });
    },

    delete: (id: Number): Promise<SQLResultSet> => {
        return new Promise(async function (resolve, reject) {
            const db = getDb();
            const tx = await transaction(db);

            const res = await query(tx, {
                sql: "DELETE FROM 'writings' WHERE id= ?",
                args: [id],
            }).catch((error) => {
                reject(error);
            });

            if (res) {
                resolve(res)
            }
        })
    }
}
