'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	SIPProfile = mongoose.model('SIPProfile');

/**
 * Globals
 */
var internalIpv6={
		name:'internal-ipv6',
		settings:[
			{'name':'debug', value:'0'},
			{'name':'sip-trace', value:'no'},
			{'name':'context', value:'public'},
			{'name':'rfc2833-pt', value:'101'},
			{'name':'sip-port', value:'$${internal_sip_port}'},
			{'name':'dialplan', value:'XML'},
			{'name':'dtmf-duration', value:'2000'},
			{'name':'inbound-codec-prefs', value:'$${global_codec_prefs}'},
			{'name':'outbound-codec-prefs', value:'$${global_codec_prefs}'},
			{'name':'use-rtp-timer', value:'true'},
			{'name':'rtp-timer-name', value:'soft'},
			{'name':'rtp-ip', value:'$${local_ip_v6}'},
			{'name':'sip-ip', value:'$${local_ip_v6}'},
			{'name':'hold-music', value:'$${hold_music}'},
			{'name':'apply-inbound-acl', value:'domains'},
			{'name':'record-template', value:'$${recordings_dir}/${caller_id_number}.${strftime(%Y-%m-%d-%H-%M-%S)}.wav'},
			{'name':'manage-presence', value:'true'},
			{'name':'inbound-codec-negotiation', value:'generous'},
			{'name':'tls', value:'$${internal_ssl_enable}'},
			{'name':'tls-bind-params', value:'transport=tls'},
			{'name':'tls-sip-port', value:'$${internal_tls_port}'},
			{'name':'tls-cert-dir', value:'$${internal_ssl_dir}'},
			{'name':'tls-version', value:'$${sip_tls_version}'},
			{'name':'inbound-late-negotiation', value:'true'},
			{'name':'inbound-zrtp-passthru', value:'true'},
			{'name':'nonce-ttl', value:'60'},
			{'name':'auth-calls', value:'$${internal_auth_calls}'},
			{'name':'auth-all-packets', value:'false'},
			{'name':'rtp-timeout-sec', value:'300'},
			{'name':'rtp-hold-timeout-sec', value:'1800'},
			{'name':'force-register-domain', value:'$${domain}'},
			{'name':'force-register-db-domain', value:'$${domain}'}
		]
	};
	var doublenat={
		name:'doublenat',
		settings:[
			{'name':'debug', value:'0'},
			{'name':'sip-trace', value:'no'},
			{'name':'sip-capture', value:'no'},
			{'name':'rfc2833-pt', value:'101'},
			{'name':'sip-port', value:'5090'},
			{'name':'dialplan', value:'XML'},
			{'name':'context', value:'public'},
			{'name':'dtmf-duration', value:'2000'},
			{'name':'inbound-codec-prefs', value:'$${global_codec_prefs}'},
			{'name':'outbound-codec-prefs', value:'$${outbound_codec_prefs}'},
			{'name':'hold-music', value:'$${hold_music}'},
			{'name':'rtp-timer-name', value:'soft'},
			{'name':'local-network-acl', value:'localnet.auto'},
			{'name':'manage-presence', value:'false'},
			{'name':'force-register-domain', value:'$${domain}'},
			{'name':'aggressive-nat-detection', value:'true'},
			{'name':'inbound-codec-negotiation', value:'generous'},
			{'name':'nonce-ttl', value:'60'},
			{'name':'auth-calls', value:'true'},
			{'name':'apply-nat-acl', value:'rfc1918'},
			{'name':'inbound-late-negotiation', value:'true'},
			{'name':'inbound-zrtp-passthru', value:'true'},
			{'name':'rtp-ip', value:'$${local_ip_v4}'},
			{'name':'sip-ip', value:'$${local_ip_v4}'},
			{'name':'ext-rtp-ip', value:'$${external_rtp_ip}'},
			{'name':'ext-sip-ip', value:'$${external_rtp_ip}'},
			{'name':'rtp-timeout-sec', value:'300'},
			{'name':'rtp-hold-timeout-sec', value:'1800'},
			{'name':'tls', value:'$${external_ssl_enable}'},
			{'name':'tls-only', value:'false'},
			{'name':'tls-bind-params', value:'transport=tls'},
			{'name':'tls-sip-port', value:'$${external_tls_port}'},
			{'name':'tls-passphrase', value:''},
			{'name':'tls-verify-date', value:'true'},
			{'name':'tls-verify-policy', value:'none'},
			{'name':'tls-verify-depth', value:'2'},
			{'name':'tls-verify-in-subjects', value:''},
			{'name':'tls-version', value:'$${sip_tls_version}'}
		]
	};
	var external={
		name:'external',
		settings:[
			{name:'debug',value:'0'},
			{name:'sip-trace',value:'no'},
			{name:'sip-capture',value:'no'},
			{name:'rfc2833-pt',value:'101'},
			{name:'sip-port',value:'$${external_sip_port}'},
			{name:'dialplan',value:'XML'},
			{name:'context',value:'public'},
			{name:'dtmf-duration',value:'2000'},
			{name:'inbound-codec-prefs',value:'$${global_codec_prefs}'},
			{name:'outbound-codec-prefs',value:'$${outbound_codec_prefs}'},
			{name:'hold-music',value:'$${hold_music}'},
			{name:'rtp-timer-name',value:'soft'},
			{name:'local-network-acl',value:'localnet.auto'},
			{name:'manage-presence',value:'false'},
			{name:'inbound-codec-negotiation',value:'generous'},
			{name:'nonce-ttl',value:'60'},
			{name:'auth-calls',value:'false'},
			{name:'inbound-late-negotiation',value:'true'},
			{name:'inbound-zrtp-passthru',value:'true'}, 
			{name:'rtp-ip',value:'$${local_ip_v4}'},
			{name:'sip-ip',value:'$${local_ip_v4}'},
			{name:'ext-rtp-ip',value:'auto-nat'},
			{name:'ext-sip-ip',value:'auto-nat'},
			{name:'rtp-timeout-sec',value:'300'},
			{name:'rtp-hold-timeout-sec',value:'1800'},
			{name:'tls',value:'$${external_ssl_enable}'},
			{name:'tls-only',value:'false'},
			{name:'tls-bind-params',value:'transport=tls'},
			{name:'tls-sip-port',value:'$${external_tls_port}'},
			{name:'tls-passphrase',value:''},
			{name:'tls-verify-date',value:'true'},{name:'tls-verify-policy',value:'none'},
			{name:'tls-verify-depth',value:'2'},
			{name:'tls-verify-in-subjects',value:''},
			{name:'tls-version',value:'$${sip_tls_version}'}
		]
	};
	var internal={
		name:'internal',
		settings:[
			{'name':'debug', value:'0'},
			{'name':'sip-trace', value:'no'},
			{'name':'sip-capture', value:'no'},
			{'name':'watchdog-enabled', value:'no'},
			{'name':'watchdog-step-timeout', value:'30000'},
			{'name':'watchdog-event-timeout', value:'30000'},
			{'name':'log-auth-failures', value:'false'},
			{'name':'forward-unsolicited-mwi-notify', value:'false'},
			{'name':'context', value:'public'},
			{'name':'rfc2833-pt', value:'101'},
			{'name':'sip-port', value:'$${internal_sip_port}'},
			{'name':'dialplan', value:'XML'},
			{'name':'dtmf-duration', value:'2000'},
			{'name':'inbound-codec-prefs', value:'$${global_codec_prefs}'},
			{'name':'outbound-codec-prefs', value:'$${global_codec_prefs}'},
			{'name':'rtp-timer-name', value:'soft'},
			{'name':'rtp-ip', value:'$${local_ip_v4}'},
			{'name':'sip-ip', value:'$${local_ip_v4}'},
			{'name':'hold-music', value:'$${hold_music}'},
			{'name':'apply-nat-acl', value:'nat.auto'},
			{'name':'apply-inbound-acl', value:'domains'},
			{'name':'local-network-acl', value:'localnet.auto'},
			{'name':'record-path', value:'$${recordings_dir}'},
			{'name':'record-template', value:'${caller_id_number}.${target_domain}.${strftime(%Y-%m-%d-%H-%M-%S)}.wav'},
			{'name':'manage-presence', value:'true'},
			{'name':'presence-hosts', value:'$${domain},$${local_ip_v4}'},
			{'name':'presence-privacy', value:'$${presence_privacy}'},
			{'name':'inbound-codec-negotiation', value:'generous'},
			{'name':'tls', value:'$${internal_ssl_enable}'},
			{'name':'tls-only', value:'false'},
			{'name':'tls-bind-params', value:'transport=tls'},
			{'name':'tls-sip-port', value:'$${internal_tls_port}'},
			{'name':'tls-passphrase', value:''},
			{'name':'tls-verify-date', value:'true'},
			{'name':'tls-verify-policy', value:'none'},
			{'name':'tls-verify-depth', value:'2'},
			{'name':'tls-verify-in-subjects', value:''},
			{'name':'tls-version', value:'$${sip_tls_version}'},
			{'name':'tls-ciphers', value:'$${sip_tls_ciphers}'},
			{'name':'inbound-late-negotiation', value:'true'}, {'name':'inbound-zrtp-passthru', value:'true'},
			{'name':'nonce-ttl', value:'60'},
			{'name':'auth-calls', value:'$${internal_auth_calls}'},
			{'name':'inbound-reg-force-matching-username', value:'true'},
			{'name':'auth-all-packets', value:'false'},
			{'name':'ext-rtp-ip', value:'auto-nat'},
			{'name':'ext-sip-ip', value:'auto-nat'},
			{'name':'rtp-timeout-sec', value:'300'},
			{'name':'rtp-hold-timeout-sec', value:'1800'},
			{'name':'challenge-realm', value:'auto_from'}
		]
	};
/**
 * Unit tests
 */
describe('SIPProfile Model Unit Tests:', function() {
	before(function(done){
		SIPProfile.remove().exec(done);
		
	});
	it('should add the internal_ipv6 profile', function(done){    
	    var p1=new SIPProfile(internalIpv6);
	    p1.save(done);
	});
	it('should add the doublenat profile', function(done){    
	    var d=new SIPProfile(doublenat);
	    d.save(done);
	});
	it('should add the internal profile', function(done){    
	    var c=new SIPProfile(internal);
	    c.save(done);
	});
	it('should add the internal_ipv6 profile', function(done){    
	    var e=new SIPProfile(external);
	    e.save(done);
	});
	it('4 profiles added',function(){
		SIPProfile.find().exec(function(err,profiles){
			profiles.should.have.length(4);
		});
	});
});