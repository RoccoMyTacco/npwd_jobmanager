local QBCore = exports['qb-core']:GetCoreObject()

RegisterNUICallback("npwd:jobmanager:getPlayerJobs", function(data, cb)
	local jobs
	local p = promise.new()
	QBCore.Functions.TriggerCallback('npwd:jobmanager:getPlayerJobs', function(jobs)
		p:resolve(jobs)
	end)
	jobs = Citizen.Await(p)
	cb({ status = "ok", data = jobs })
end)

RegisterNUICallback("npwd:jobmanager:removeJob", function(data, cb)
	print(job)
	TriggerServerEvent('qb-multijob:server:deleteJob', data.job)
	cb({ status = "ok" })
end)

RegisterNUICallback("npwd:jobmanager:getCurJob", function(data, cb)
	local curjob
	local p = promise.new()
	QBCore.Functions.TriggerCallback('npwd:jobmanager:getCurJob', function(job)
		p:resolve(job)
	end)
	curjob = Citizen.Await(p)
	cb({ status = "ok", data = curjob })
end)

RegisterNUICallback('npwd:jobmanager:toggleDuty', function(data, cb)
    local Player = QBCore.Functions.GetPlayerData()
    local job = Player.job.name
    if job == 'lspd' or job == 'sast' or job == 'bcso' or job == 'co' then
        TriggerEvent('qb-policejob:ToggleDuty')
    elseif job == 'ambulance' then
        TriggerEvent('EMSToggle:Duty')
    end
    TriggerServerEvent("QBCore:ToggleDuty")
    TriggerServerEvent('trp-dutylogger:server:ToggleDutyLogger')
	local Player2 = QBCore.Functions.GetPlayerData()
	cb({ status = "ok", data = Player2.job.onduty })
end)

RegisterNUICallback('npwd:jobmanager:changeJob', function(data, cb)
    local Player = QBCore.Functions.GetPlayerData()
    local job = Player.job.name
	local njob = data.value
	local ngrade = data.grade
    TriggerServerEvent('trp-dutylogger:server:ChangeJob', job, njob)
    TriggerServerEvent('qb-multijob:server:changeJob', njob, ngrade)
	cb({ status = "ok" })
end)