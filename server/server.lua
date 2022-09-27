QBCore.Functions.CreateCallback('npwd:jobmanager:getPlayerJobs', function(source, cb)
  local src = source
  local Player = QBCore.Functions.GetPlayer(src)
  local cid = Player.PlayerData.citizenid
  local jobList = {}
  local icon
  MySQL.query('SELECT * FROM player_jobs WHERE cid = ?', {cid}, function(jobs)
      for k, v in pairs(jobs) do
          table.insert(jobList,
              {
                  job = v.job,
                  salary = QBCore.Shared.Jobs[v.job].grades[tostring(v.grade)].payment,
                  jobLabel = QBCore.Shared.Jobs[v.job].label,
                  gradeLabel = QBCore.Shared.Jobs[v.job].grades[tostring(v.grade)].name,
                  grade = v.grade,
              }
          )
      end
      cb(json.encode(jobList))
  end)
end)