local QBCore = exports['qb-core']:GetCoreObject()

RegisterNUICallback("npwd:jobmanager:getPlayerJobs", function(_, cb)
	local jobs
	local p = promise.new()
	QBCore.Functions.TriggerCallback('npwd:jobmanager:getPlayerJobs', function(jobs)
		p:resolve(jobs)
	end)
	jobs = Citizen.Await(p)
	cb({ status = "ok", data = jobs })
end)

RegisterNUICallback("npwd:jobmanager:removeJob", function(_, cb, job)
	TriggerServerEvent('qb-multijob:server:deleteJob', job)
end)