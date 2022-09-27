local QBCore = exports['qb-core']:GetCoreObject()

QBCore.Functions.CreateCallback('npwd:jobmanager:getPlayerJobs', function(source, cb)
  local src = source
  local Player = QBCore.Functions.GetPlayer(src)
  local cid = Player.PlayerData.citizenid
  local jobList = MySQL.query.await('SELECT * FROM player_jobs WHERE cid = ?', {cid})
    cb(jobList)
end)