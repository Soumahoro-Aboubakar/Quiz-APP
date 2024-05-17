import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("toqetoqeUser1.db");

export const createDataBase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, pseudo TEXT, phoneNumber TEXT, pays TEXT, coins Number , montantPaye Number, montantImpaye Number , userId Text , userIsPlayingRandomGame Number , randomGameResultIsReady Number,userHasTheRightToMakeSetting Number)",
      [],
      (tx, result) => {
        console.log("La table user a été créée avec succès!", result);
      },
      (tx, error) => {
        console.error(
          "Erreur lors de la création de la table des user:",
          error
        );
      }
    );
  });
};

export const insert = (
  pseudo,
  phoneNumber,
  pays,
  coins,
  montantPaye,
  montantImpaye,
  userId,
  userIsPlayingRandomGame = 0,
  randomGameResultIsReady = 0,
  userHasTheRightToMakeSetting
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      console.log("Lancement de l'insertion");
      tx.executeSql(
        "INSERT INTO user (pseudo, phoneNumber, pays, coins, montantPaye, montantImpaye , userId ,userIsPlayingRandomGame,randomGameResultIsReady,userHasTheRightToMakeSetting) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          pseudo,
          phoneNumber,
          pays,
          coins,
          montantPaye,
          montantImpaye,
          userId,
          userIsPlayingRandomGame,
          randomGameResultIsReady,
          userHasTheRightToMakeSetting,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log("Utilisateur enregistré avec succès!");
            resolve("Utilisateur enregistré avec succès!");
          } else {
            const errorMsg = "Échec de l'enregistrement de l'utilisateur.";
            console.log(errorMsg);
            reject(errorMsg);
          }
        },
        (error) => {
          const errorMsg =
            "Erreur pendant la transaction d'INSERT : " + error.message;
          console.log(errorMsg);
          reject(errorMsg);
        }
      );
    });
  });
};

export const fetchUserData = (setUserData) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM user",
        [],
        (tx, results) => {
          const rows = results.rows;
          const userDataArray = [];
          for (let i = 0; i < rows.length; i++) {
            userDataArray.push({
              id: rows.item(i).id,
              pseudo: rows.item(i).pseudo,
              phoneNumber: rows.item(i).phoneNumber,
              coinsTotal: rows.item(i).coins,
              montantImpaye: rows.item(i).montantImpaye,
              montantPaye: rows.item(i).montantPaye,
              pays: rows.item(i).pays,
              userId: rows.item(i).userId,
              userIsPlayingRandomGame: rows.item(i).userIsPlayingRandomGame,
              randomGameResultIsReady: rows.item(i).randomGameResultIsReady,
              userHasTheRightToMakeSetting:
                rows.item(i).userHasTheRightToMakeSetting,
            });
          }
          console.log("====================================");
          console.log(userDataArray, "  userData");
          console.log("====================================");
          //setUserData(userDataArray);
          resolve(userDataArray);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};

export const deleteDataBse = (tableName) => {
  const dropTableQuery = `DROP TABLE IF EXISTS ${tableName}`;
  db.transaction((tx) => {
    tx.executeSql(
      dropTableQuery,
      [],
      (_, result) => {
        console.log(`Table ${tableName} effacée avec succès.`);
      },
      (error) => {
        console.error(
          `Erreur lors de l'effacement de la table ${tableName}: `,
          error
        );
      }
    );
  });
};

export const updateUserData = (pseudo, phoneNumber, pays, userId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE user SET pseudo=?, phoneNumber=?, pays=? WHERE id=?",
        [pseudo, phoneNumber, pays, userId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            resolve("Utilisateur mis à jour avec succès!");
          } else {
            reject("Échec de la mise à jour de l'utilisateur.");
          }
        }
      );
    });
  });
};

export const updateValue = (property, value, userId) => {
  console.log(property, value, userId, "ça passe 0");
  if (!property) {
    console.error("La propriété n'est pas spécifiée.");
    return;
  }
  db.transaction(
    (tx) => {
      tx.executeSql(
        `UPDATE user SET ${property} = ? WHERE id=?`,
        [value, userId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log(`La mise à jour de ${property} a réussi!`);
          } else {
            console.log(`Aucune ligne mise à jour pour ${property}.`);
          }
        },
        (_, error) => {
          console.error(`Erreur lors de la mise à jour de ${property}:`, error);
        }
      );
    },
    (error) => {
      console.error("Erreur de transaction :", error);
    }
  );
};

///  here are  some operaions on transaction
export const createDataBaseGameResults = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS gameResults (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "message TEXT NOT NULL," +
        "phoneNumber TEXT NOT NULL," +
        "timer TEXT NOT NULL," +
        "paye TEXT NOT NULL," +
        "gain REAL," +
        "userValue INTEGER NOT NULL," +
        "results TEXT NOT NULL," +
        "usersLength INTEGER NOT NULL," + // Ajout de la virgule ici
        "type TEXT" + // Correction du type de la colonne
        ");",
      [],
      (tx, result) => {
        console.log("La table gameResults a été créée avec succès!");
      },
      (tx, error) => {
        console.error(
          "Erreur lors de la création de la table gameResults:",
          error
        );
      }
    );
  });
};


// database.js
// ...

export const insertGameResult = (gameResult) => {
  if (!gameResult) return;
  console.log(gameResult);
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO gameResults (message, phoneNumber, timer, paye, gain, userValue, results, usersLength ,type) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)",
          [
            gameResult.message,
            gameResult.phoneNumber,
            gameResult.timer,
            gameResult.paye,
            gameResult.gain,
            gameResult.userValue,
            JSON.stringify(gameResult.results),
            gameResult.usersLength,
            gameResult.type,
          ],
          (_, results) => {
            resolve(results.insertId);
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      (_, error) => {
        reject(error);
      }
    );
  });
};

export const getAllGameResults = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("SELECT * FROM gameResults", [], (tx, results) => {
          const gameResults = [];
          for (let i = 0; i < results.rows.length; i++) {
            gameResults.push(results.rows.item(i));
          }
          resolve(gameResults);
        });
      },
      (error) => reject(error)
    );
  });
};

// Ajoutez d'autres fonctions CRUD au besoin

//____________________________________
export const createDataBaseTransaction = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, participant TEXT, result TEXT, paid TEXT, gain TEXT, date TEXT , phoneNumber TEXT);"
    );
  });
};

export const insertTransaction = (
  participant,
  result,
  paid,
  gain,
  date,
  phoneNumber
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO transactions (participant, result, paid, gain, date , phoneNumber) VALUES (?, ?, ?, ?, ? ,?)",
        [participant, result, paid, gain, date, phoneNumber],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            resolve(" Store reussie avec succès ");
          } else {
            reject("Echec de stockage");
          }
        }
      );
    });
  });
};

export const updateGameResults = (property, value, userId) => {
  if (!property) return;

  console.log(property, " property");
  console.log(`UPDATE transactions SET ${property} = ? WHERE id = ?`);
  console.log(userId, " userId");

  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE gameResults SET ${property} = ? WHERE id = ?`,
      [value, userId],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log("La mise à jour a réussi ! : ", property);
        } else {
          console.log("Échec de la mise à jour. ", property);
        }
      }
    );
  });
};

export const fetchTransactions = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM transactions", [], (tx, results) => {
        const rows = results.rows;
        const transactionsArray = [];
        for (let i = 0; i < rows.length; i++) {
          transactionsArray.push({
            id: rows.item(i).id,
            participant: rows.item(i).participant,
            result: rows.item(i).result,
            paid: rows.item(i).paid,
            gain: rows.item(i).gain,
            date: rows.item(i).date,
            phoneNumber: rows.item(i).phoneNumber,
          });
        }
        resolve(transactionsArray);
      }),
        (tx, error) => {
          reject("Une erreur est survenue ", error);
        };
    });
  });
};

//handle ads date  (cette partie ne sera pas implementer dans la version 1 une, peut être que dans les versions à avenir oui)

const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS UserDates (id INTEGER PRIMARY KEY AUTOINCREMENT, lastUsedDate INTEGER);"
    );
  });
};

export const initializeDatabase = () => {
  setupDatabase();
};

export const updateUserLastUsedDate = (date) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT OR REPLACE INTO UserDates (id, lastUsedDate) VALUES (1, ?);",
      [date]
    );
  });
};

export const getUserLastUsedDate = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM UserDates WHERE id = 1;",
        [],
        (_, result) => {
          const lastUsedDate = result.rows.item(0)?.lastUsedDate || null;
          resolve(lastUsedDate);
        }
      ),
        (tx, error) => {
          reject("Une erreur est survenue ", error);
        };
    });
  });
};
